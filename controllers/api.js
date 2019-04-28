const { User, Organization } = require('../models')
const config = require('../config')
const request = require('request')
const randtoken = require('rand-token')

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
  const org = await Organization.findById(user.organizationId)
  await org.update({
    twitterToken: req.body.oauth_token,
    twitterTokenSecret: req.body.oauth_token_secret,
  })
  return res.status(200).send(org)
}

exports.storeFbToken = async function(req, res) {
  const user = await User.findById(req.user.id)
  const org = await Organization.findById(user.organizationId)
  await org.update({
    facebookToken: req.body.accessToken,
  })
  return res.status(200).send(org)
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
      const org = await Organization.findById(user.organizationId)
      await org.update({
        linkedinToken: parsedBody.access_token,
      })
      return res.status(200).send(org)
    },
  )
}

exports.sharefb = async function(req, res, next) {
  const status = {
    facebook: '',
    twitter: '',
    linkedin: '',
  }
  const org = await Organization.findById(req.user.organizationId)

  if (req.body.facebook) {
    status.facebook = 'success'
  }

  req.options = req.body
  req.status = status
  req.org = org

  return next()
}

exports.sharetw = function(req, res, next) {
  if (req.options.twitter) {
    request.post(
      {
        url: `https://api.twitter.com/1.1/statuses/update.json?status=${
          req.options.text
        }\n${req.options.link}`,
        oauth: {
          consumer_key: config.twitter.consumer_key,
          consumer_secret: config.twitter.consumer_secret,
          token: req.org.twitterToken,
          token_secret: req.org.twitterTokenSecret,
        },
      },
      function(err, r, body) {
        if (body.created_at) {
          req.status.twitter = 'success'
        } else {
          req.status.twitter = 'failed to post'
        }
        return next()
      },
    )
  }
}

exports.sharelk = function(req, res, next) {
  if (req.options.linkedin) {
    request.get(
      {
        url: `https://api.linkedin.com/v2/me`,
        headers: {
          Authorization: `Bearer ${req.org.linkedinToken}`,
        },
      },
      function(err, r, body) {
        req.status.linkedin = 'success'
        console.log(body)
        return res.send(req.status)
      },
    )
  }
}
