require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const requestId = require('express-request-id')
const morgan = require('morgan')

const models = require('./models')
const config = require('./config')
const routes = require('./routes')

const Sentry = require('@sentry/node')

Sentry.init({
  dsn: 'https://ad71656e9b3b464686df163a72709485@sentry.io/1427417',
})

process.on('unhandledRejection', console.error)

const app = express()

app.use(Sentry.Handlers.requestHandler())

// adds `X-Response-Time` header to responses
app.use(responseTime())

// adds or re-uses `X-Request-Id` header
app.use(requestId())

app.use(morgan())

// Middleware to handle CORS
app.use((req, res, next) => {
  let oneof = false
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    oneof = true
  }
  if (req.headers['access-control-request-method']) {
    res.header(
      'Access-Control-Allow-Methods',
      req.headers['access-control-request-method'],
    )
    oneof = true
  }
  if (req.headers['access-control-request-headers']) {
    res.header(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers'],
    )
    oneof = true
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365)
  }
  if (oneof && req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(bodyParser.json({ parameterLimit: 100000, limit: '500mb' }))
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '500mb',
  }),
)
app.use(cookieParser())

app.use((req, res, next) => {
  req.locals.Sentry = Sentry
  next()
})

app.use('/', routes)

// handle 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(Sentry.Handlers.errorHandler())

app.use((err, req, res) => {
  console.error(err)
  res.status(err.status || 500).send()
})

models.sequelize.sync().then(() => {
  const server = app.listen(config.port)
  console.log(
    'Listening at http://localhost:%s in %s mode',
    server.address().port,
    app.get('env'),
  )
})
