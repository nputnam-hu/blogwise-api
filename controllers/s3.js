const {
  AWS: { buckets },
} = require('../config')
const { s3 } = require('../config/aws')

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
    if (err) {
      req.locals.Sentry.captureException(err)
      return next(err)
    }
    return res.json(url)
  })
}

exports.uploadPhoto = (req, res, next) =>
  uploadS3Object(req, res, next, buckets.logos)
