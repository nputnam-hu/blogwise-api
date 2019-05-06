const { Organization } = require('../models')
const config = require('../config')
const request = require('request')
const Twitter = require('twitter')

exports.twitterUserInfo = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  const params = {}
  const client = new Twitter({
    consumer_key: config.twitterUpload.consumer_key,
    consumer_secret: config.twitterUpload.consumer_secret,
    access_token_key: org.twitterToken,
    access_token_secret: org.twitterTokenSecret,
  })

  client
    .get('account/verify_credentials.json', params)
    .then(tweet => {
      return res.json(tweet)
    })
    .catch(error => console.log(error))
}

exports.twitterRequestTokenToAuthToken = function(req, res) {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: config.twitterUpload.redirect_uri,
        consumer_key: config.twitterUpload.consumer_key,
        consumer_secret: config.twitterUpload.consumer_secret,
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

exports.twitterGetAccessToken = function(req, res, next) {
  request.post(
    {
      url: `https://api.twitter.com/oauth/access_token`,
      oauth: {
        consumer_key: config.twitterUpload.consumer_key,
        consumer_secret: config.twitterUpload.consumer_secret,
        token: req.body.oauth_token,
      },
      form: {
        oauth_verifier: req.body.oauth_verifier,
      },
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message })
      }
      const bodyString =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
      const parsedBody = JSON.parse(bodyString)
      console.log(parsedBody)
      req.token = parsedBody
      return next()
    },
  )
}

exports.storeTwitterToken = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  await org.update({
    twitterToken: req.token.oauth_token,
    twitterTokenSecret: req.token.oauth_token_secret,
  })
  return res.status(200).send(org)
}

exports.uploadToTwitter = function(req, res, next) {
  if (req.options.twitter) {
    const params = { status: `${req.body.text} \n ${req.body.link}` }
    const client = new Twitter({
      consumer_key: config.twitterUpload.consumer_key,
      consumer_secret: config.twitterUpload.consumer_secret,
      access_token_key: req.org.twitterToken,
      access_token_secret: req.org.twitterTokenSecret,
    })

    client
      .post('statuses/update.json', params)
      .then(tweet => {
        return next()
      })
      .catch(error => console.log(error))
  } else {
    return next()
  }
}
