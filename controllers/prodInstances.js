const { ProdInstance } = require('../models')
const { sendAlertEmail } = require('../utils')
const errors = require('../errors')

exports.getOpenInstance = async (req, res, next) => {
  try {
    const openInstances = await ProdInstance.findAll({
      where: { isTaken: false },
    })
    // check how many open instances there are
    if (openInstances.length === 0) {
      sendAlertEmail('There are 0 Open Instances!!!!')
      return res
        .status(500)
        .send(errors.makeError(errors.err.NO_OPEN_PROD_INSTANCE))
    }
    if (openInstances.length < 10) {
      sendAlertEmail(
        `<b>There are only ${openInstances.length} open instances left!!</b>`,
      )
    }
    sendAlertEmail(
      `A new user has created an account! There are ${
        openInstances.length
      } open instances left`,
    )
    const openInstance = openInstances[0]
    openInstance.isTaken = true
    await openInstance.save()
    req.openInstance = openInstance
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
  try {
    const newInstance = await ProdInstance.build(req.body)
    await newInstance.save()
    return res.json(newInstance)
  } catch (err) {
    return next(err)
  }
}
