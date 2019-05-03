const moment = require('moment')
const _ = require('lodash')
const { Organization, CalendarPost } = require('../models')
const errors = require('../errors')
const searchTweets = require('../utils/searchTweets')

// exports.createCalendar = async (req, res, next) => {
//   const validationError = errors.missingFields(req.body, [
//     'startDate',
//     'endDate',
//     'users',
//   ])
//   if (validationError) return res.status(400).send(validationError)

//   const newCalendar = await Calendar.build({
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//   })
//   if (!newCalendar) {
//     return res.status(400).send('Could not create user')
//   }

//   try {
//     await newCalendar.save()
//     const org = await Organization.findById(req.user.organizationId)
//     org.setCalendar(newCalendar)
//     req.body.users.forEach(id => newCalendar.addUser(id))
//     return res.json(newCalendar)
//   } catch (err) {
//     return next(err)
//   }
// }

exports.getCalendarFromUser = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const calendarPosts = await org.getCalendarPosts()
    if (!calendarPosts) {
      return res.json(null)
    }
    req.calendar = calendarPosts
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.scheduleInitialPosts = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['posts'])
  if (validationError) return res.status(400).send(validationError)

  const { posts } = req.body
  let { startDate, endDate } = req.calendar
  startDate = moment(startDate)
  endDate = moment(endDate)
  const days = endDate.diff(startDate, 'days')
  const datedPosts = _.range(0, days, days / posts.length).map((n, i) => {
    return {
      ...posts[i],
      dueDate: startDate
        .clone()
        .add(Math.floor(n), 'days')
        .set('hour', 13),
    }
  })
  try {
    const calendar = await Calendar.findById(req.calendar.id)
    const promises = datedPosts.map(async post => {
      const newPost = await CalendarPost.build(post)
      calendar.addPosts([newPost])
      return newPost.save()
    })
    const savedPosts = await Promise.all(promises)
    return res.json({ posts: savedPosts })
  } catch (err) {
    return next(err)
  }
}

exports.updatePost = async (req, res, next) => {
  console.log('HERE', req.body)
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

exports.getPosts = async (req, res, next) => {
  const { id } = req.calendar
  try {
    const calendar = await Calendar.findById(id)
    const posts = await calendar.getPosts()
    const labeledPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      dueDate: post.dueDate,
      tags: post.tags,
    }))
    return res.json(labeledPosts)
  } catch (err) {
    return next(err)
  }
}

exports.getNextPostDue = async (req, res, next) => {
  const { id } = req.calendar
  try {
    const post = await CalendarPost.findOne({
      where: {
        calendarId: id,
        dueDate: { $gt: moment() },
      },
      order: [['dueDate', 'ASC']],
    })
    if (!post) return res.json({})
    if (post.relevantTweets.length === 0) {
      post.relevantTweets = await searchTweets(
        post.title,
        post.tags.map(t => t.label),
      )
      await post.save()
    }
    return res.json(post)
  } catch (err) {
    return next(err)
  }
}
