const { Organization } = require('../models')
const config = require('../config')
const request = require('request')

exports.facebookUserInfo = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  request.get(
    {
      url: `https://graph.facebook.com/${org.facebookId}?access_token=${
        org.facebookToken
      }`,
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message })
      }
      const parsed = JSON.parse(body)
      return res.json(parsed)
    },
  )
}

exports.storeShortLivedFbToken = async function(req, res, next) {
  const org = await Organization.findById(req.user.organizationId)
  await org.update({
    facebookId: req.body._profile.id,
  })
  req.org = org
  req.shortlivedtoken = { token: req.body._token.accessToken }
  return next()
}

exports.generateLonglivedToken = function(req, res, next) {
  request.get(
    {
      url: `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${
        config.facebook.app_id
      }&client_secret=${config.facebook.app_secret}&fb_exchange_token=${
        req.shortlivedtoken.token
      }`,
    },
    function(err, r, body) {
      if (err) {
        return next(err)
      }
      const parsed = JSON.parse(body)
      req.generatedtoken = parsed
      return next()
    },
  )
}

exports.generateFacebookCode = function(req, res, next) {
  request.get(
    {
      url: `https://graph.facebook.com/oauth/client_code?access_token=${
        req.generatedtoken.access_token
      }&client_secret=${config.facebook.app_secret}&redirect_uri=${
        config.facebook.redirect_uri
      }&client_id=${config.facebook.app_id}`,
    },
    function(err, r, body) {
      if (err) {
        return next(err)
      }
      const parsed = JSON.parse(body)
      req.codeobj = parsed
      return next()
    },
  )
}

exports.generateLongLivedTokenUsingCode = async function(req, res, next) {
  const org = await Organization.findById(req.org.id)
  request.get(
    {
      url: `https://graph.facebook.com/oauth/access_token?code=${
        req.codeobj.code
      }&client_id=${config.facebook.app_id}&redirect_uri=${
        config.facebook.redirect_uri
      }`,
    },
    async function(err, r, body) {
      if (err) {
        return next(err)
      }
      const parsed = JSON.parse(body)
      await org.update({
        facebookToken: parsed.access_token,
      })
      return next()
    },
  )
}

exports.storePageToken = async function(req, res) {
  const org = await Organization.findById(req.org.id)
  request.get(
    {
      url: `https://graph.facebook.com/${
        org.facebookId
      }/accounts?access_token=${org.facebookToken}`,
    },
    function(err, r, body) {
      const parsed = JSON.parse(body)
      request.get(
        {
          url: `https://graph.facebook.com/${
            parsed.data[0].id
          }?fields=access_token&access_token=${org.facebookToken}`,
        },
        async function(err, r, body) {
          if (err) {
            return res.send(500, { message: err.message })
          }
          await org.update({
            facebookPageToken: JSON.parse(body).access_token,
            facebookPageId: JSON.parse(body).id,
          })
          return res.status(200).send(org)
        },
      )
    },
  )
}

exports.uploadToFacebook = async function(req, res, next) {
  const org = await Organization.findById(req.user.organizationId)

  req.options = req.body
  req.org = org

  if (req.body.facebook) {
    request.post(
      {
        url: `https://graph.facebook.com/${org.facebookPageId}/feed?message=${
          req.body.text
        }&link=${req.body.link}&access_token=${org.facebookPageToken}`,
      },
      function(err, r, body) {
        if (err) {
          return next(err)
        }
        return next()
      },
    )
  } else {
    return next()
  }
}
