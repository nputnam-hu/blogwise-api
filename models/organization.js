module.exports = function defineOrginization(sequelize, DataTypes) {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    stripeToken: {
      type: DataTypes.STRING,
    },
    twitterToken: {
      type: DataTypes.TEXT,
    },
    twitterTokenSecret: {
      type: DataTypes.TEXT,
    },
    facebookId: {
      type: DataTypes.TEXT,
    },
    facebookToken: {
      type: DataTypes.TEXT,
    },
    facebookPageToken: {
      type: DataTypes.TEXT,
    },
    facebookPageId: {
      type: DataTypes.TEXT,
    },
    linkedinToken: {
      type: DataTypes.TEXT,
    },
    linkedinId: {
      type: DataTypes.TEXT,
    },
    surveyAnswer: {
      type: DataTypes.STRING,
    },
    plan: {
      type: DataTypes.STRING,
      enum: ['FREE', 'STARTER', 'GROWTH', 'ENTERPRISE'],
      defaultValue: 'STARTER',
    },
  })

  Organization.associate = function buildOrganization(models) {
    Organization.hasMany(models.User, {
      as: 'users',
      foreignKey: 'organizationId',
    })
    Organization.hasMany(models.CalendarPost, {
      as: 'calendarPosts',
    })
    Organization.hasOne(models.Blog)
  }

  return Organization
}
