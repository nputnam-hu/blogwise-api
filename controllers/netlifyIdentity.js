const { User } = require('../models')
const errors = require('../errors')
const config = require('../config')
const jwt = require('jwt-simple')

async function handlePassword(email, password, res, next) {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .send(errors.makeError(errors.err.OBJECT_NOT_FOUND, { name: 'user' }))
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch)
      return res
        .status(400)
        .send(errors.makeError(errors.err.INCORRECT_PASSWORD))
    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = jwt.encode(payload, config.tokenSecret)
    user.token = token
    await user.save()
    return res.send(token)
  } catch (err) {
    return next(err)
  }
}

function handleToken(username, password, res, next) {}

exports.loginUser = (req, res, next) => {
  const { grant_type: grantType, username, password } = req.body
  console.log(username, password, req.body)
  switch (grantType) {
    case 'password':
      return handlePassword(username, password, res, next)
    case 'refresh_token':
      return handleToken(username, password, res, next)
    default:
      return res.sendStatus(404)
  }
}

exports.validateToken = async (req, res, next) => {
  return next()
  const token = req.headers.Authorization.split(' ')[1]
  let decoded
  try {
    decoded = jwt.decode(token, config.tokenSecret)
  } catch (err) {
    return res.status(400).send(errors.makeError(errors.err.INVALID_TOKEN))
  }
}

exports.getSettings = (_, res) =>
  res.json({
    external: {
      bitbucket: false,
      github: false,
      gitlab: false,
      google: false,
    },
    disable_signup: true,
    autoconfirm: false,
  })

exports.getUserData = async (req, res, next) => res.sendStatus(200)

exports.logoutUser = async (req, res, next) => res.sendStatus(200)
