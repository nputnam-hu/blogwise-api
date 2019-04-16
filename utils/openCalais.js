const calais = require('opencalais-tagging');
const config = require('../config');

exports.tagContent = async content => {
  const options = {
    content: content,
    accessToken: config.openCalaisApiToken
  }
  const response = await calais.tag(options)

  const socialTags = Object.keys(response).filter(key => key.includes('SocialTag'))
  const categories = Object.keys(response).filter(key => key.includes('cat/'))
  return socialTags.map(key => response[key].originalValue).concat(categories.map(key => response[key].name))
}