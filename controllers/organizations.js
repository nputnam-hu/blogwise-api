const { Organization } = require('../models')

exports.createOrganization = async (req, res, next) => {
  const newOrg = await Organization.build(req.body)
  if (!newOrg) {
    return res.status(400).send('Could not create user')
  }
  try {
    await newOrg.save()
    await newOrg.setBlog(req.blogId)
    await newOrg.addUser(req.user)
    req.organizationId = newOrg.id
    return res.json({ token: req.user.token })
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
