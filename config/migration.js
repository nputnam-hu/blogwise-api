const config = require('./index')

module.exports = {
  development: {
    username: config.db.development.username,
    password: config.db.development.password,
    database: config.db.development.database,
    host: config.db.development.host,
    dialect: config.db.development.dialect,
  },
  test: {
    username: config.db.development.username,
    password: config.db.development.password,
    database: config.db.development.database,
    host: config.db.development.host,
    dialect: config.db.development.dialect,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
}
