const moment = require('moment')

const tips = [
  'Business blogging is most effective when it is done consistently. Create a Content Strategy in the "Post Genius" tab to plan and get scheduled reminders and content suggestions for upcoming posts.',
  'The categories of content that recieve the most user engagement are guides, lists, and topical industry news commentary',
  'Businesses who blog recieve 67% more posts on average than those who do not',
  "If you're running low on ideas for blog posts, try repurposing internal docs as a blog post!",
].filter(s => s.length < 200)

function genTipOfTheDay(startDate) {
  const now = moment()
  const days = now.diff(startDate, 'days')
  return tips[days % tips.length]
}

module.exports = (req, res) =>
  res.json(genTipOfTheDay(moment(req.user.createdAt)))
