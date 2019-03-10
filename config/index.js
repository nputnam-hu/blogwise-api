module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
  saltRounds: process.env.SALT_ROUNDS || 10,
  port: process.env.PORT || 3001,
  alertToAdresses: ['noahputnam@college.harvard.edu'],
  db: {
    development: {
      username: process.env.USERNAME || 'admin',
      password: process.env.PASSWORD || 'adminpw',
      database: process.env.DATABASE || 'blogwise',
      host: process.env.HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      secret: process.env.SECRET || 'thisisthesecret',
    },
    production: {
      databaseURL: process.env.DATABASE_URL,
    },
  },
  AWS: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAIQYLBNTWV7ORIPJA',
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY ||
      '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',
    region: process.env.AWS_S3_REGION || 'us-east-1',
    buckets: {
      logos: 'megaphone-logo-uploads',
    },
  },
  netlifyApiToken:
    process.env.NETLIFY_API_TOKEN ||
    '6602da1d60c73a18ea48a76f7c320b936124ebdfe7628698a1adb0f36a765c02',
  githubApiToken:
    process.env.GITHUB_API_TOKEN ||
    'Basic bnB1dG5hbS1odTpmNjhkNWJiMzZkNmI1ZTI1OTY2YTI5YTA3ZjE0ODYzZDUwZjUzMjg2',
  githubOwner: 'nputnam-hu',
  deafultHeadshot:
    'https://s3.amazonaws.com/megaphone-logo-uploads/defaultUser.png',
}
