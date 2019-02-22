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
      `A new user has created an account! There are ${
        openInstances.length
      } open instances left`,
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
  const validationError = errors.missingFields(req.body, [
    'githubRepo',
    'netlifyUrl',
  ])
  if (validationError) return res.status(400).send(validationError)
  if (req.body.netlifyUrl.endsWith('/')) {
    return res.status(400).send('No trailing slash in netlifyUrl')
  }
  try {
    const newInstance = await ProdInstance.build(req.body)
    await newInstance.save()
    return res.json(newInstance)
  } catch (err) {
    return next(err)
  }
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
