const { Organization, User, Blog } = require('../models')
const {
  getCustomerPlanFromStripeToken,
  getCustomerInvoices,
} = require('./payments')
const axios = require('axios')

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
    const stripeData = {
      ...(await getCustomerPlanFromStripeToken(org.stripeToken)),
      ...(await getCustomerInvoices(org.stripeToken)),
    }
    return res.json(stripeData)
  } catch (err) {
    return next(err)
  }
}

exports.getOrganizationRow = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
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

// ADMIN ROUTE ONLY. PERMANANTLY DELETES ACCOUNT
exports.deleteOrganization = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['userId, reallySure'])
  if (validationError) return res.status(400).send(validationError)
  if (req.body.reallySure !== 'YES') {
    return res
      .status(200)
      .send('Must be really sure, this action will not be reversible')
  }
  try {
    const user = await User.findById(req.body.userId)
    if (!user) {
      return res.sendStatus(404)
    }
    const org = await Organization.findById(user.organizationId)
    const blog = await org.getBlog()
    const prodInstance = await blog.getProdInstance()
    prodInstance.isTaken = false
    await prodInstance.save()
    const jsonData = {
      customNavbarLinks: [],
      token: '',
      apiUrl: 'https://megaphone-api-prod.herokuapp.com',
      hasBeenInitialized: false,
    }
    await axios.post(
      `${prodInstance.buildHookUrl}?${qs.stringify({
        trigger_title: 'Update Blog',
      })}`,
      jsonData,
    )
    await Organization.destory({ where: { id: org.id } })
    await Blog.destroy({ where: { id: blog.id } })
    await User.destory({ where: { id: user.id } })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}
