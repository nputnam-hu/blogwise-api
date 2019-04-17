const jwt = require('jwt-simple')
const crypto = require('crypto')
const Sentry = require('@sentry/node')
const { User } = require('../models')
const config = require('../config')
const { ses } = require('../config/aws')
const forgotPassword = require('../emails/forgotPassword')
const errors = require('../errors.js')

exports.loginUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['email', 'password'])
  if (validationError) return res.status(400).send(validationError)

  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res
        .status(400)
        .send(errors.makeError(errors.err.OBJECT_NOT_FOUND, { name: 'user' }))
    }
    const isMatch = await user.comparePassword(req.body.password)
    if (!isMatch)
      return res
        .status(400)
        .send(errors.makeError(errors.err.INCORRECT_PASSWORD))

    // add relevant data to token
    const { token, type } = user
    return res.json({ token, type })
  } catch (err) {
    return next(err)
  }
}

async function validateToken(req, res, next, options) {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']

  // Super admins are blogwise employees
  if (
    options.superAdminRequired &&
    token === (process.env.SUPER_ADMIN_PW || 'devpw')
  ) {
    return next()
  }

  if (!token)
    return res.status(400).send(errors.makeError(errors.err.NOT_AUTHENTICATED))
  let decoded
  try {
    decoded = jwt.decode(token, config.tokenSecret)
  } catch (err) {
    return res.status(400).send(errors.makeError(errors.err.INVALID_TOKEN))
  }
  if (!decoded.id)
    return res.status(400).send(errors.makeError(errors.err.INVALID_TOKEN))

  try {
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(400).send(errors.makeError(errors.err.NO_USER))
    }
    if (
      token !== user.token ||
      (options.adminRequired && user.type !== 'ADMIN')
    ) {
      return res.status(400).send(errors.makeError(errors.err.INVALID_TOKEN))
    }
    req.user = user
    req.id = decoded.id
    // Set scope for sentry
    Sentry.configureScope(scope => {
      scope.setUser({ email: user.email, id: user.id })
    })
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.validateUser = (req, res, next) => {
  validateToken(req, res, next, {})
}

exports.validateAdmin = (req, res, next) => {
  validateToken(req, res, next, { adminRequired: true })
}

exports.validateSuperAdmin = (req, res, next) => {
  validateToken(req, res, next, { superAdminRequired: true })
}

exports.changePassword = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'oldPassword',
    'newPassword',
  ])
  if (validationError) return res.status(400).send(validationError)

  try {
    const user = await User.findById(req.id)
    if (!user) {
      return res
        .status(400)
        .send(errors.makeError(errors.err.NOT_AUTHENTICATED))
    }
    const isMatch = await user.comparePassword(req.body.oldPassword)
    if (!isMatch)
      return res
        .status(400)
        .send(errors.makeError(errors.err.INCORRECT_PASSWORD))

    user.hash = req.body.newPassword
    await user.save()
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.resetPassword = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'email',
    'token',
    'newPassword',
  ])
  if (validationError) return res.status(400).send(validationError)

  try {
    const user = await User.find({ email: req.body.email })

    if (!user) {
      return res.status(400).send(
        errors.makeError(errors.err.OBJECT_NOT_FOUND, {
          object: ['user'],
        }),
      )
    }
    if (!user.passwordToken || req.body.token !== user.passwordToken) {
      return res.status(400).send(errors.makeError(errors.err.NOT_AUTHORIZED))
    }
    const hour = 60 * 60 * 1000
    // if (new Date() - user.passwordTokenCreatedDate > hour) {
    //   return res.status(400).send(errors.makeError(errors.err.EXPIRED_TOKEN))
    // }
    user.hash = req.body.newPassword
    await user.save()
    return res.json({ token: user.token, type: user.type })
  } catch (err) {
    return next(err)
  }
}

exports.sendResetToken = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['email'])
  if (validationError) return res.status(400).send(validationError)
  const user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))

  let token

  try {
    token = await new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) return reject(err)
        return resolve(buf.toString('hex'))
      })
    })
  } catch (err) {
    return res.status(400).send(errors.makeError(errors.err.SERVER_ERROR))
  }
  user.passwordToken = token
  user.passwordTokenCreatedDate = Date.now()

  try {
    await user.save()
    const params = {
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: forgotPassword(user.passwordToken, user.email),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Reset Your blogwise Password`,
        },
      },
      Source: 'blogwise Team <support@blogwise.co>',
    }
    await ses.sendEmail(params).promise()
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}
