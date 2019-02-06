const {
  S3: { buckets },
} = require('../config')
const s3 = require('../config/s3')

async function uploadS3Object(req, res, next, bucketName) {
  const { fileName, contentType } = req.body
  const keyName = fileName

  const s3Params = {
    Bucket: bucketName,
    Key: keyName,
    Expires: 60,
    ContentType: contentType,
    ACL: 'public-read',
  }
  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    if (err) return next(err)
    return res.json(url)
  })
}

exports.uploadLogo = (req, res, next) =>
  uploadS3Object(req, res, next, buckets.logos)

exports.uploadJSON = (req, res, next) =>
  uploadS3Object(req, res, next, buckets.json)
