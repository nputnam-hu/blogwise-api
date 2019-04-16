const config = require('../config')
const bcrypt = require('bcrypt')

module.exports = function defineUser(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hash: {
      type: DataTypes.STRING,
    },
    passwordToken: {
      type: DataTypes.STRING,
    },
    passwordTokenCreatedDate: {
      type: DataTypes.DATE,
    },
    token: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      enum: ['WRITER', 'ADMIN'],
    },
    bio: {
      type: DataTypes.STRING,
    },
    headshotUri: {
      type: DataTypes.STRING,
      defaultValue: config.deafultHeadshot,
    },
    twitterAccessToken: {
      type: DataTypes.STRING,
    },
    twitterId: {
      type: DataTypes.STRING,
    },
    facebookToken: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.STRING,
    },
    linkedinToken: {
      type: DataTypes.STRING,
    },
  })

  // Methods
  User.prototype.comparePassword = function comparePassword(pw) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pw, this.hash, (err, isMatch) => {
        if (err) return reject(err)
        return resolve(isMatch)
      })
    })
  }

  // Hooks
  function encryptPasswordIfChanged(user) {
    if (user.changed('hash')) {
      // eslint-disable-next-line no-param-reassign
      user.hash = bcrypt.hashSync(user.hash, config.saltRounds)
    }
  }

  User.beforeCreate(encryptPasswordIfChanged)
  User.beforeUpdate(encryptPasswordIfChanged)

  return User
}
