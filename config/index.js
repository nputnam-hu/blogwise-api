module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
  saltRounds: process.env.SALT_ROUNDS || 10,
  port: process.env.PORT || 3001,
  alertToAdresses: [
    'noahputnam@college.harvard.edu',
    'iseerha@college.harvard.edu',
  ],
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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || null,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || null,
    region: process.env.AWS_S3_REGION || 'us-east-1',
    buckets: {
      logos: 'megaphone-logo-uploads',
    },
  },
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || null,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || null,
    access_token_key: process.env.TWITTER_ACCCESS_TOKEN_KEY || null,
    access_token_secret: process.env.TWITTER_ACCCESS_TOKEN_SECRET || null,
  },
  stripeApiToken: process.env.STRIPE_API_TOKEN || null,
  netlifyApiToken: process.env.NETLIFY_API_TOKEN || null,
  githubApiToken: process.env.GITHUB_API_TOKEN || null,
  githubOwner: 'nputnam-hu',
  deafultHeadshot:
    'https://s3.amazonaws.com/megaphone-logo-uploads/defaultUser.png',
}
