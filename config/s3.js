const config = require('./index')
const AWS = require('aws-sdk')

const { accessKeyId, secretAccessKey, region } = config.S3
const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region })

module.exports = s3
