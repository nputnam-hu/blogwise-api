const { User } = require('../models')
const errors = require('../errors')
const config = require('../config')
const jwt = require('jwt-simple')

exports.loginUser = async (req, res, next) => {
  console.log(req.body)
  return res.sendStatus(200)
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
