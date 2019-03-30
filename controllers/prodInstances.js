const { ProdInstance, Blog } = require('../models')
const { sendAlertEmail } = require('../utils')
const errors = require('../errors')

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
        1} open instances left`,
      `${Date.now()} — New User Sign Up`,
    )
    const firstOpenInstance = openInstances[0]
    firstOpenInstance.isTaken = true
    await firstOpenInstance.save()
    req.openInstance = firstOpenInstance
    return next()
  } catch (err) {
    req.locals.Sentry.captureException(err)
    return next(err)
  }
}

exports.createInstance = async (req, res, next) => {
  const promises = req.body.instances.map(async instance => {
    const validationError = errors.missingFields(instance, [
      'githubRepo',
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
      req.locals.Sentry.captureException(err)
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
    req.locals.Sentry.captureException(err)
    return next(err)
  }
}
