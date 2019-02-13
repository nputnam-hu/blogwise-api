const { User, Organization } = require('../models')
const jwt = require('jwt-simple')
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

exports.createUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'name',
    'email',
    'type',
  ])
  if (validationError) return res.status(400).send(validationError)
  const newUser = await User.build(req.body)
  if (!newUser) {
    return res.status(400).send('Could not create user')
  }
  try {
    await newUser.save()
    const org = await Organization.findById(req.user.organizationId)
    await org.addUser(newUser)

    return res.json({ user: newUser })
  } catch (err) {
    console.error(err)
    if (err.code === 11000)
      return res.status(400).send(errors.makeError(errors.err.EXISTING_EMAIL))
    return res.status(500).send(errors.makeError(errors.err.SERVER_ERROR))
  }
}

exports.getAllUsers = async (_, res) => {
  const users = await User.findAll({})
  return res.json(users)
}

exports.updateUser = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'name',
    'bio',
    'type',
    'headshotUri',
    'id',
  ])
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
