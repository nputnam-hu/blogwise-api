/* eslint-disable camelcase */
const WordPOS = require('wordpos')
const Twitter = require('twitter')
const {
  twitterSearch: {
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  },
} = require('../config')

const wordpos = new WordPOS()

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
})

module.exports = (title, tags) =>
  new Promise(async (resolve, reject) => {
    try {
      const titleNouns = await wordpos.getNouns(title.toLowerCase())
      const nounQuery = titleNouns.filter(s => !parseInt(s, 10)).join(' ')
      const tweets = await client.get('/search/tweets', {
        q: `${tags
          .map(t => `#${t.toLowerCase().replace(/ /g, '')}`)
          .join(' OR ')} filter:links`,
        result_type: 'popular',
        count: 10,
      })
      const cleanedTweets = tweets.statuses.map(tweet => ({
        id: tweet.id_str,
        text: tweet.text,
      }))
      resolve(cleanedTweets)
    } catch (err) {
      reject(err)
    }
  })
