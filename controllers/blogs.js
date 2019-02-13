const { Blog, Organization } = require('../models')

exports.createBlog = async (req, _, next) => {
  try {
    const newBlog = await Blog.build({})
    await newBlog.save()
    req.blogId = newBlog.id
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.getBlogFromUser = async (req, _, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const blog = await org.getBlog()
    req.blog = blog
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.updateBlog = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  try {
    const blog = await Blog.update(req.body, { where: { id } })
    return res.json(blog)
  } catch (err) {
    return next(err)
  }
}

exports.getBlog = (req, res) => res.json(req.blog)
