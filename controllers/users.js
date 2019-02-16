const jwt = require('jwt-simple')
const { User, Organization } = require('../models')
const { ses } = require('../config/aws')
const { allowedUsers } = require('../utils')
const inviteUser = require('../emails/inviteUser')
const config = require('../config')
const errors = require('../errors')

exports.creatFirstUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body.user, [
    'name',
    'email',
    'hash',
  ])
  if (validationError) return res.status(400).send(validationError)

  const newUser = await User.build({ type: 'ADMIN', ...req.body.user })
  if (!newUser) {
    return res.status(400).send('Could not create user')
  }
  const payload = {
    id: newUser.id,
    email: newUser.email,
  }

  const token = jwt.encode(payload, config.tokenSecret)
  newUser.token = token
  try {
    await newUser.save()
    req.user = newUser
    return next()
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send(errors.makeError(errors.err.EXISTING_EMAIL))
    return res.status(500).send(errors.makeError(errors.err.SERVER_ERROR))
  }
}

exports.inviteUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'name',
    'email',
    'type',
  ])
  if (validationError) return res.status(400).send(validationError)
  try {
    const newUser = await User.build(req.body)
    if (!newUser) {
      return res.status(400).send('Could not create user')
    }
    const org = await Organization.findById(req.user.organizationId)
    const orgUsers = await org.getUsers()
    if (orgUsers.length + 1 > allowedUsers(org.plan)) {
      return res
        .status(400)
        .send(errors.makeError(errors.err.MAX_USERS_REACHED))
    }
    await newUser.save()
    await org.addUser(newUser)
    const params = {
      Destination: {
        ToAddresses: [req.body.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: inviteUser(newUser.id),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${req.user.name} has invited you to join their Blogwise Team`,
        },
      },
      Source: 'Blogwise Team <support@blogwise.co>',
    }
    await ses.sendEmail(params).promise()
    return res.json({ user: newUser })
  } catch (err) {
    console.error(err)
    if (err.name == 'SequelizeUniqueConstraintError') {
      return res.status(400).send(errors.makeError(errors.err.EXISTING_EMAIL))
    }
    return next(err)
  }
}

exports.registerInvitedUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['id', 'password'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const user = await User.findById(req.body.id)
    if (user.token) {
      return res.status(400).send('User already has been registered')
    }
    const payload = {
      id: user.id,
      email: user.email,
    }
    const token = jwt.encode(payload, config.tokenSecret)
    user.password = req.body.password
    user.token = token
    await user.save()
    return res.json({ token, type: user.type })
  } catch (err) {
    return next(err)
  }
}

exports.getAllUsers = async (_, res) => {
  const users = await User.findAll({})
  return res.json(users)
}

exports.getUser = (req, res) => res.json(req.user)

exports.updateUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['id'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const user = await User.findById(req.body.id)
    if (user.organizationId !== req.user.organizationId) {
      return res.status(403).send('User does not belong to your organization')
    }
    if (user.id === req.user.id) {
      // users should not be able to change their own type
      req.body.type = user.type
    }
    await user.update({
      name: req.body.name,
      bio: req.body.bio,
      type: req.body.type,
      headshotUri: req.body.headshotUri,
    })

    return res.json(user)
  } catch (err) {
    return next(err)
  }
}
