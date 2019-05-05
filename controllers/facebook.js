const { Organization } = require('../models')
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

exports.storeFbToken = async function(req, res, next) {
  const org = await Organization.findById(req.user.organizationId)
  await org.update({
    facebookToken: req.body._token.accessToken,
    facebookId: req.body._profile.id,
  })
  req.org = org
  return next()
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
    console.log(req.body.link)
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
        console.log(body)
        return next()
      },
    )
  } else {
    return next()
  }
}
