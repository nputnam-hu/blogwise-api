const schedule = require('node-schedule')
const _ = require('lodash')
const moment = require('moment')
const { BlogPost, Blog } = require('../models')
const { commitJSON } = require('./blogs')
const errors = require('../errors')

async function cancelJobById(blogPost) {
  const job = schedule.scheduledJobs[blogPost.id]
  if (job) {
    job.cancel()
  }
  blogPost.scheduledPublishDate = null
  if (blogPost.save) {
    await blogPost.save()
  }
}

exports.createBlogPost = async (req, res, next) => {
  const { id } = req.blog
  try {
    const newBlogPost = await BlogPost.build(req.body)
    if (!newBlogPost) {
      return res.status(400).send('Could not create blog post')
    }
    await newBlogPost.save()
    const blog = await Blog.findById(id)
    blog.addBlogPost(newBlogPost)
    return res.json(newBlogPost)
  } catch (err) {
    return next(err)
  }
}

exports.updateBlogPost = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['id'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const blogPost = await BlogPost.findById(req.body.id)
    await blogPost.update(req.body)
    if (req.body.author) {
      await blogPost.setUser(req.body.author)
    }
    return res.json(blogPost)
  } catch (err) {
    return next(err)
  }
}

exports.getBlogPostById = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
    if (!blogPost) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
    const user = await blogPost.getUser()
    return res.json({
      ...blogPost.dataValues,
      author: user ? { value: user.id, label: user.name } : '',
    })
  } catch (err) {
    return next(err)
  }
}

exports.deleteBlogPostById = async (req, res, next) => {
  try {
    await cancelJobById({ id: req.params.id })
    const deleteSuccess = await BlogPost.destroy({
      where: { id: req.params.id },
    })
    if (!deleteSuccess) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.getBlogPosts = async (req, res, next) => {
  const { id } = req.blog
  try {
    const blog = await Blog.findById(id)
    const blogPosts = await blog.getBlogPosts({
      order: [['publishDate', 'DESC']],
    })
    return res.json(blogPosts)
  } catch (err) {
    return next(err)
  }
}

async function deployBlogPost(blogPost, user) {
  console.log('EXECUTED DEPLOY BLOG')
  if (!blogPost.slug) {
    blogPost.slug = `/a/${moment(blogPost.publishDate).format(
      'YYYY-MM-DD',
    )}-${_.kebabCase(blogPost.title)}`
  }
  blogPost.hasBeenPublished = true
  blogPost.scheduledPublishDate = null
  await blogPost.save()
  await commitJSON(blogPost.blogId, user)
}

exports.publishBlogPostNow = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
    if (!blogPost) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
    if (!blogPost.title || !blogPost.htmlBody || !blogPost.publishDate) {
      return res.sendStatus(400)
    }
    cancelJobById(blogPost.id)
    await deployBlogPost(blogPost, req.user)
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.publishBlogPostLater = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'scheduledPublishDate',
  ])
  if (validationError) return res.status(400).send(validationError)
  console.log('\n\n', req.body.scheduledPublishDate, '\n\n')
  try {
    const blogPost = await BlogPost.findById(req.params.id)
    if (!blogPost) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
    if (!blogPost.title || !blogPost.htmlBody || !blogPost.publishDate) {
      return res.sendStatus(400)
    }
    await cancelJobById(blogPost)
    console.log(req.body.scheduledPublishDate)
    schedule.scheduleJob(
      blogPost.id,
      moment(req.body.scheduledPublishDate).toDate(),
      deployBlogPost.bind(null, blogPost, req.user),
    )
    blogPost.scheduledPublishDate = req.body.scheduledPublishDate
    await blogPost.save()
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.cancelScheduledPublish = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
    await cancelJobById(blogPost)
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.unpublishBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
    await blogPost.update({ hasBeenPublished: false })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}
