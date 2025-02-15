const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const configdb = require('../config').db[env]

let sequelize

if (env === 'development') {
  sequelize = new Sequelize(
    configdb.database,
    configdb.username,
    configdb.password,
    configdb,
  )
} else {
  sequelize = new Sequelize(configdb.databaseURL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  })
}

const db = {}
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
