module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
  saltRounds: process.env.SALT_ROUNDS || 10,
  port: process.env.PORT || 3001,
  alertToAdresses: [
    'noahputnam@college.harvard.edu',
    'iseerha@college.harvard.edu',
    'ahillmann@college.harvard.edu',
    'dara@blogwise.co',
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
    consumer_key:
      // process.env.TWITTER_CONSUMER_KEY ||
      '46EOkfEGDuftWDE0vLRwOAJfp',
    consumer_secret:
      // process.env.TWITTER_CONSUMER_SECRET ||
      '8LQDt7sQVXrYYsdxLx6pWRTqkSTlVN204MtXoGgq1VdPVKd5BS',
    redirect_uri: 'http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fsocial',
  },
  facebook: {
    app_id: '1078110902387157',
    app_secret: 'd9012f6c769ff7f3f8edca855bc54296',
    redirect_uri: 'https%3A%2F%2Fwww.blogwise.co/',
  },
  linkedin: {
    client_id: '78lfgcpfr5idxn',
    client_secret: 'fMC2Eq6BLjVUaE0e',
    redirect_uri: 'http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fsocial',
  },
  stripeApiToken: process.env.STRIPE_API_TOKEN || null,
  netlifyApiToken: process.env.NETLIFY_API_TOKEN || null,
  githubApiToken: process.env.GITHUB_API_TOKEN || null,
  githubOwner: 'nputnam-hu',
  deafultHeadshot:
    'https://s3.amazonaws.com/megaphone-logo-uploads/defaultUser.png',
}
