const openCalais = require('../utils/openCalais')
const config = require('../config')
const unsplash = require('unsplash-api');

const queryPictures = tag => {
  return new Promise((resolve, reject) => {
    unsplash.searchPhotos(tag, null, null, 2, (error, photos, link) => {
      if (error) {
        reject(error);
      }
      resolve(photos);
    });
  });
}

exports.imageSuggestion = async (req, res) => {

  const tags = await openCalais.tagContent(req.content)
  unsplash.init(config.unsplashApiAppId)

  promises = await tags.map(async tag => await queryPictures(tag))
  const results = await Promise.all(promises)
  res.json(results);
}