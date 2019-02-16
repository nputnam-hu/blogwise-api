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
    surveyAnswer: {
      type: DataTypes.STRING,
    },
    plan: {
      type: DataTypes.STRING,
      enum: ['FREE', 'STARTER', 'GROWTH', 'ENTERPRISE'],
    },
  })

  Organization.associate = function buildOrganization(models) {
    Organization.hasMany(models.User, {
      as: 'users',
      foreignKey: 'organizationId',
    })
    Organization.hasOne(models.Blog)
  }

  return Organization
}
