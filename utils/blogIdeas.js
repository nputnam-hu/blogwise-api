const _ = require('lodash')

const randomClickbaitNumber = (lower = 12, upper = 19) =>
  Math.floor(Math.random() * (upper - lower) + lower)

const headlines = [
  noun => `${noun} 101: the Beginner's Guide to ${noun}`,
  noun => `${randomClickbaitNumber()} things to know about ${noun}`,
  noun =>
    `${randomClickbaitNumber()} Quick Tips to Start ${noun} like an Expert`,
  noun => `How not to do ${noun}`,
  noun => `${randomClickbaitNumber()} Ways People Screw Up ${noun}`,
  noun =>
    `${randomClickbaitNumber()} Common Mistakes People Make When Starting ${noun}`,
  noun =>
    `${randomClickbaitNumber(
      3,
      7,
    )} Interesting ${noun} Companies and What They Bring to the Table`,
  noun => `${randomClickbaitNumber(3, 7)} Amazing Examples of ${noun}`,
  noun => `${noun} Made Simple: A Step-By-Step Guide`,
  noun => `How to Explain ${noun} To Anyone`,
  noun =>
    `${noun} Done Right: ${randomClickbaitNumber(3, 6)} Examples to Learn From`,
  noun => `How to Get Smarter at ${noun} in 5 minutes`,
  noun => `How we think about ${noun}`,
  noun => `DIY Guide to ${noun}`,
  noun => `The Science Behind ${noun}`,
  noun => `The Definitive Ranking of ${noun} Techniques`,
  noun => `How to Get More From ${noun} for Less`,
  noun =>
    `${randomClickbaitNumber()} ${noun} Ideas You Haven't Heard of Before`,
  noun => `The Intermediate Guide to ${noun}`,
  noun =>
    `${randomClickbaitNumber(
      5,
      10,
    )} Free Tools to Help You Get Started with ${noun}`,
  noun =>
    `${randomClickbaitNumber(
      5,
      10,
    )} Free Resources to Help You Learn More About ${noun}`,
  noun =>
    `${randomClickbaitNumber()} Common Misconceptions People Have About ${noun}`,
  noun => `${noun}: Expectation versus Reality`,
  noun => `The next big trend in ${noun}`,
  noun => `This weeks most interesting stories about ${noun}`,
]

const genHeadlines = (nouns, n = 3) => {
  const ret = []
  const indexes = []
  for (let i = 0; i < n; i += 1) {
    let potentialIndex = Math.floor(Math.random() * headlines.length)
    while (indexes.includes(potentialIndex)) {
      potentialIndex = Math.floor(Math.random() * headlines.length)
    }
    indexes.push(potentialIndex)
    const noun = _.startCase(nouns[Math.floor(Math.random() * nouns.length)])
    ret.push(headlines[potentialIndex](noun))
  }
  return ret
}

exports.headlines = headlines
exports.genHeadlines = genHeadlines
