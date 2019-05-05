const { Organization } = require('../models')
const config = require('../config')
const request = require('request')

exports.generateUrl = function(req, res) {
  return res.json({
    url: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
      config.linkedin.client_id
    }&redirect_uri=${
      config.linkedin.redirect_uri
    }&state=noahisabasedgod&scope=r_liteprofile%20r_emailaddress%20w_member_social`,
  })
}

exports.linkedinUserInfo = async function(req, res) {
  const org = await Organization.findById(req.user.organizationId)
  request.get(
    {
      url: 'https://api.linkedin.com/v2/me',
      headers: {
        Authorization: `Bearer ${org.linkedinToken}`,
      },
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
      if (err) {
        return res.send(500, { message: err.message })
      }
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
          if (err) {
            return res.send(500, { message: err.message })
          }
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

exports.uploadToLinkedin = function(req, res) {
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
      if (err) {
        return next(err)
      }
      return res.json(body)
    },
  )
}
