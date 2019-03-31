const { Organization } = require('../models')
const { getCustomerPlanFromStripeToken } = require('./payments')

exports.createOrganization = async (req, res, next) => {
  const newOrg = await Organization.build({
    stripeToken: req.stripeCustomerId,
    ...req.body,
  })
  if (!newOrg) {
    return res.status(400).send('Could not create user')
  }
  try {
    await newOrg.save()
    await newOrg.setBlog(req.blogId)
    await newOrg.addUser(req.user)
    req.organizationId = newOrg.id
    return res.json({
      token: req.user.token,
      type: req.user.type,
    })
  } catch (err) {
    return next(err)
  }
}

exports.getOrganization = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const plan = await getCustomerPlanFromStripeToken(org.stripeToken)
    org.plan = plan
    return res.json(org)
  } catch (err) {
    return next(err)
  }
}

exports.updateOrganization = async (req, res, next) => {
  try {
    await Organization.update(req.body, {
      where: { id: req.user.organizationId },
    })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.getOrganizationUsers = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const orgUsers = await org.getUsers()
    return res.json(orgUsers)
  } catch (err) {
    return next(err)
  }
}
