const moment = require('moment')
module.exports = function newCalendarPost(title, tags, dueDate) {
  return `You've been assigned a new post!
Post title: ${title}
Tags: ${tags.toString()}
Due: ${moment(dueDate).format('MMMM Do YYYY, h:mm:ss a')}
Your post is due ${moment(dueDate).fromNow()}. Best get blogging!`
}
