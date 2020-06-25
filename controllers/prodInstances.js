const { ProdInstance, Blog } = require('../models')
const { sendAlertEmail } = require('../utils')
const errors = require('../errors')
const client = require('../config/netlify')
const normalizeUrl = require('normalize-url')

exports.getOpenInstance = async (req, res, next) => {
  try {
    const openInstances = await ProdInstance.findAll({
      where: { isTaken: false },
    })
    // check how many open instances there are
    if (openInstances.length === 0) {
      sendAlertEmail(
        'There are 0 Open Instances!!!!',
        `${Date.now()} — Big Problem`,
      )
      return res
        .status(500)
        .send(errors.makeError(errors.err.NO_OPEN_PROD_INSTANCE))
    }
    sendAlertEmail(
      `A new user has created an account! There are ${openInstances.length -
        1} open instances left. User name: ${req.body.user.name}, email: ${
        req.body.user.email
      }`,
      `${Date.now()} — New User Sign Up`,
    )
    const firstOpenInstance = openInstances[0]
    firstOpenInstance.isTaken = true
    await firstOpenInstance.save()
    req.openInstance = firstOpenInstance
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.createInstance = async (req, res, next) => {
  const promises = req.body.instances.map(async instance => {
    const validationError = errors.missingFields(instance, [
      'buildHookUrl',
      'netlifyUrl',
    ])
    if (validationError) return res.status(400).send(validationError)
    if (instance.netlifyUrl.endsWith('/')) {
      return res.status(400).send('No trailing slash in netlifyUrl')
    }
    try {
      const newInstance = await ProdInstance.build(instance)
      return newInstance.save()
    } catch (err) {
      return next(err)
    }
  })
  await Promise.all(promises)
  return res.sendStatus(200)
}
exports.getInstance = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  try {
    const blog = await Blog.findById(id)
    const prodInstance = await blog.getProdInstance()
    return res.json(prodInstance)
  } catch (err) {
    return next(err)
  }
}

exports.autoCreateInstances = async (req, res, next) => {
  const deployKeyObj = await client.createDeployKey()

  const siteOption = {
    name: null,
    custom_domain: null,
    password: null,
    user_id: '5c2d23ef820efea2c62fa226',
    force_ssl: null,
    account_slug: 'nputnam-hu',
    account_name: "Noah Putnam's team",
    account_type: 'personal',
    deploy_hook: 'https://api.netlify.com/hooks/github',
    processing_settings: {
      css: { bundle: true, minify: true },
      js: { bundle: true, minify: true },
      images: { optimize: true },
      html: { pretty_urls: true },
      skip: true,
    },
    repo: {
      id: 171395074,
      provider: 'github',
      deploy_key_id: deployKeyObj.id,
      repo_path: 'nputnam-hu/blogwise-template-1-canonical',
      repo_branch: 'deploy',
      repo_url: 'https://github.com/nputnam-hu/blogwise-template-1-canonical',
      dir: 'public',
      cmd: 'npm run build',
      allowed_branches: ['master'],
      public_repo: true,
      private_logs: null,
      installation_id: 653696,
      env: {},
    },
  }

  const site = await client.createSite({ body: siteOption })

  const hookOptions = {
    site_id: site.site_id,
    buildHook: {},
  }

  const buildHook = await client.createSiteBuildHook(hookOptions)

  const newInstance = await ProdInstance.create({
    buildHookUrl: buildHook.url,
    netlifyUrl: normalizeUrl(site.url, { forceHttps: true }),
  })

  return res.json(newInstance)
}
