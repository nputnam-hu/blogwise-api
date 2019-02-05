const {
  S3: { buckets },
} = require('../config')
const s3 = require('../config/s3')

async function uploadS3Object(req, res, next, bucketName) {
  try {
    const { fileName, contentType } = req.body
    const keyName = `${Date.now()}_${fileName}`

    const s3Params = {
      Bucket: bucketName,
      Key: keyName,
      Expires: 60,
      ContentType: contentType,
      ACL: 'public-read',
    }
    const url = s3.getSignedUrl('putObject', s3Params)

    return res.json(url)
  } catch (err) {
    return next(err)
  }
}

exports.uploadLogo = (req, res, next) =>
  uploadS3Object(req, res, next, buckets.logos)

exports.uploadJSON = (req, res, next) =>
  uploadS3Object(req, res, next, buckets.json)
