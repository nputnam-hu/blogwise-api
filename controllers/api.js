const { Organization } = require('../models')
const fs = require('fs')
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
  const org = await Organization.findById(req.user.organizationId)
  await org.update({
    twitterToken: req.body.oauth_token,
    twitterTokenSecret: req.body.oauth_token_secret,
  })
  return res.status(200).send(org)
}

exports.storeFbToken = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  await org.update({
    facebookToken: req.body.accessToken,
  })
  return res.status(200).send(org)
}

exports.getPageToken = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  request.get(
    {
      url: `https://graph.facebook.com/340782893308270?fields=access_token&access_token=${
        org.facebookToken
      }`,
    },
    async function(err, r, body) {
      await org.update({
        facebookPageToken: JSON.parse(body).access_token,
      })
      return res.status(200).send(org)
    },
  )
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
      const org = await Organization.findById(req.user.organizationId)
      request.get(
        {
          url: `https://api.linkedin.com/v2/me`,
          headers: {
            Authorization: `Bearer ${parsedBody.access_token}`,
          },
        },
        async function(err, r, body) {
          await org.update({
            linkedinToken: parsedBody.access_token,
            linkedinId: JSON.parse(body).id,
          })
          return res.status(200).send(org)
        },
      )
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

  req.options = req.body
  req.status = status
  req.org = org

  if (req.body.facebook) {
    request.post(
      {
        url: `https://graph.facebook.com/340782893308270/feed?message=${
          req.body.text
        }&link=${req.body.link}&access_token=${org.facebookPageToken}`,
      },
      function(err, r, body) {
        if (body.id) {
          status.facebook = 'success'
        } else {
          status.facebook = 'failed to post'
        }
        return next()
      },
    )
  }
  return next()
}

exports.sharetw = function(req, res, next) {
  console.log(req)
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
        fs.writeFileSync('./try1.json', JSON.stringify(fs.writeFileSync))
        if (body.created_at) {
          req.status.twitter = 'success'
        } else {
          req.status.twitter = 'failed to post'
        }
        return next()
      },
    )
  }
  return next()
}

exports.sharelk = function(req, res) {
  const status = req.status
  const bodyobj = {
    author: `urn:li:person:${req.org.linkedinId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: `${req.options.text}`,
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            originalUrl: `${req.options.link}`,
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS',
    },
  }

  request.post(
    {
      url: `https://api.linkedin.com/v2/ugcPosts`,
      headers: {
        Authorization: `Bearer ${req.org.linkedinToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(bodyobj),
    },
    function(err, r, body) {
      status.linkedin = 'success'
      return res.send(status)
    },
  )
}
