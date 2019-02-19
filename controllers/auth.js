const jwt = require('jwt-simple')
const crypto = require('crypto')
const { User } = require('../models')
const config = require('../config')
const errors = require('../errors.js')

exports.loginUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['email', 'password'])
  if (validationError) return res.status(400).send(validationError)

  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user || user.type !== 'ADMIN') {
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
    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = jwt.encode(payload, config.tokenSecret)
    user.token = token
    await user.save()
    return res.json({ token })
  } catch (err) {
    return next(err)
  }
}

async function validateToken(req, res, next, options) {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']

  // Super admins are blogwise admins
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
    if (Date.now() - user.passwordTokenCreatedDate > hour) {
      return res.status(400).send(errors.makeError(errors.err.EXPIRED_TOKEN))
    }
    user.hash = req.body.newPassword
    await user.save()
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.sendResetToken = async (req, res) => {
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

  // user.save(err => {
  //   if (err) return next(err)

  //   const msg = {
  //     to: user.email,
  //     from: 'support@' + config.appDomain,
  //     subject: 'Recovering your ' + config.appName + ' password.',
  //     text:
  //       'Hi ' +
  //       user.name +
  //       ',\n\nHere is your generated password reset token. Insert it into the password recovery modal on ' +
  //       config.appDomain +
  //       'to reset your password. If you did not request this, then ignore this email.\n\nToken: ' +
  //       token +
  //       '.',
  //     html:
  //       '<h1>Hi ' +
  //       user.name +
  //       ',<h1><br><p>Here is your generated password reset token. Insert it into the password recovery modal on <a href=' +
  //       config.appDomain +
  //       '>' +
  //       config.appDomain +
  //       '</a> to reset your password. If you did not request this, then ignore this email.</p><br><p>Token: ' +
  //       token +
  //       '</p>'
  //   }
  //   sgMail.send(msg)
  return res.sendStatus(200)
  // })
}
