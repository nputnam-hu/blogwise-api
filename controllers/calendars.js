const moment = require('moment')
const _ = require('lodash')
const { Organization, Calendar, CalendarPost } = require('../models')
const errors = require('../errors')

exports.createCalendar = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, [
    'startDate',
    'endDate',
    'users',
  ])
  if (validationError) return res.status(400).send(validationError)

  const newCalendar = await Calendar.build({
    startDate: req.body.startDate,
    endDate: req.boddy.endDate,
  })
  if (!newCalendar) {
    return res.status(400).send('Could not create user')
  }

  try {
    await newCalendar.save()
    req.body.users.forEach(id => newCalendar.addUser(id))
    return res.json(newCalendar)
  } catch (err) {
    return next(err)
  }
}

exports.getCalendarFromUser = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const calendar = await org.getCalendar()
    req.calendar = calendar
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.scheduleInitialPosts = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['posts'])
  if (validationError) return res.status(400).send(validationError)

  const { posts } = req.bdoy
  let { startDate, endDate } = req.calendar
  startDate = moment(startDate)
  endDate = moment(endDate)
  const days = endDate.diff(startDate, 'days')
  const datedPosts = _.range(0, days, days / posts.length).map((n, i) => {
    return {
      ...posts[i],
      dueDate: startDate.clone().add(Math.floor(n), 'days'),
    }
  })
  try {
    const calendar = await Calendar.findById(req.calendar.id)
    const promises = datedPosts.map(async post => {
      const newPost = await CalendarPost.build(post)
      calendar.addPost(newPost)
      return newPost.save()
    })
    const savedPosts = await Promise.all(promises)
    return res.json({ posts: savedPosts })
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
