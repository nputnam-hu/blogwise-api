module.exports = {
  port: process.env.PORT || 3001,
  S3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || null,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || null,
    region: process.env.AWS_S3_REGION || 'us-east-1',
    buckets: {
      logos: 'megaphone-logo-uploads',
      json: 'megaphone-json-files',
    },
  },
}
