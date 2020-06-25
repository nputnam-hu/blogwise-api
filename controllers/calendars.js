const moment = require('moment')
const _ = require('lodash')
const { Organization, CalendarPost, User } = require('../models')
const errors = require('../errors')
const searchTweets = require('../utils/searchTweets')
const newCalendarPost = require('../emails/newCalendarPost')
const { ses } = require('../config/aws')

exports.getCalendarFromUser = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const posts = await org.getCalendarPosts()
    if (!posts) {
      return res.json([])
    }
    const labeledPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      dueDate: post.dueDate,
      tags: post.tags,
      author: post.authorId,
      relevantTweets: post.relevantTweets,
    }))
    return res.json(labeledPosts)
  } catch (err) {
    return next(err)
  }
}

exports.scheduleNewPost = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'title',
    'authorId',
    'dueDate',
    'tags',
  ])
  if (validationError) return res.status(400).send(validationError)
  console.log('BODY', req.body)
  const { title, authorId, dueDate, tags } = req.body
  try {
    const newPost = await CalendarPost.create({ title, dueDate, tags })
    if (authorId) {
      const author = await User.findById(authorId)
      await newPost.setAuthor(author)
    }
    const organization = await Organization.findById(req.user.organizationId)
    await organization.addCalendarPosts(newPost)
    await newPost.save()
    // newPost.relevantTweets = await searchTweets(newPost.title, newPost.tags)
    // await newPost.save()
    // const params = {
    //   Destination: {
    //     ToAddresses: [author.email],
    //   },
    //   Message: {
    //     Body: {
    //       Text: {
    //         Charset: 'UTF-8',
    //         Data: newCalendarPost(title, tags, dueDate),
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: `New post assigned!`,
    //     },
    //   },
    //   Source: 'blogwise Team <support@blogwise.co>',
    // }
    // await ses.sendEmail(params).promise()
    return res.json(newPost)
  } catch (err) {
    return next(err)
  }
}

exports.updatePost = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['id', 'post'])
  if (validationError) return res.status(400).send(validationError)

  try {
    const [rowsAffected, post] = await CalendarPost.update(req.body.post, {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    })
    if (rowsAffected === 0) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
    return res.json(post)
  } catch (err) {
    return next(err)
  }
}

exports.getNextPostDue = async (req, res, next) => {
  try {
    const post = await CalendarPost.findOne({
      where: {
        OrganizationId: req.user.organizationId,
        dueDate: { $gt: moment() },
      },
      order: [['dueDate', 'ASC']],
    })
    if (!post) return res.json({})
    // if (post.relevantTweets.length === 0) {
    //   post.relevantTweets = await searchTweets(
    //     post.title,
    //     post.tags.map(t => t.label),
    //   )
    //   await post.save()
    // }
    return res.json(post)
  } catch (err) {
    return next(err)
  }
}
