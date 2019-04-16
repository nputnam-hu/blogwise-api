const { User } = require('../models')
const config = require('../config')
const request = require('request')

exports.authToken = function(req, res) {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: config.twitter.redirect_uri,
        consumer_key: config.twitter.consumer_key,
        consumer_secret: config.twitter.consumer_secret,
      },
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message })
      }
      const jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
      res.send(JSON.parse(jsonStr))
    },
  )
}
exports.accessToken = function(req, res, next) {
  request.post(
    {
      url: `https://api.twitter.com/oauth/access_token`,
      oauth: {
        consumer_key: config.twitter.consumer_key,
        consumer_secret: config.twitter.consumer_secret,
        token: req.query.oauth_token,
      },
      form: {
        oauth_verifier: req.query.oauth_verifier,
      },
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message })
      }
      const bodyString =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
      const parsedBody = JSON.parse(bodyString)
      res.status(200).send(parsedBody)
    },
  )
}
exports.storeTwitterToken = async function(req, res) {
  const user = await User.findById(req.user.id)
  await user.update({
    twitterAccessToken: req.body.oauth_token,
    twitterId: req.body.user_id,
  })
  return res.status(200).send(user)
}

exports.storeFbToken = async function(req, res) {
  const user = await User.findById(req.user.id)
  await user.update({
    facebookToken: req.body.accessToken,
    facebookId: req.body.id,
  })
  return res.status(200).send(user)
}
exports.linkedinToken = function(req, res) {
  request.post(
    {
      url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${
        req.body.code
      }&redirect_uri=${config.linkedin.redirect_uri}&client_id=${
        config.linkedin.client_id
      }&client_secret=${config.linkedin.client_secret}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    async function(err, r, body) {
      const parsedBody = JSON.parse(body)
      const user = await User.findById(req.user.id)
      await user.update({
        linkedinToken: parsedBody.access_token,
      })
      return res.status(200).send(user)
    },
  )
}
