const config = require('./index')
const AWS = require('aws-sdk')

const { accessKeyId, secretAccessKey, region } = config.AWS
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
})

exports.s3 = new AWS.S3({
  signatureVersion: 'v4',
})

exports.ses = new AWS.SES({ apiVersion: '2010-12-01' })
