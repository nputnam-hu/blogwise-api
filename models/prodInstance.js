module.exports = function defineProdInstance(sequelize, DataTypes) {
  const ProdInstance = sequelize.define('ProdInstance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    buildHookUrl: {
      type: DataTypes.STRING,
      unique: true,
    },
    netlifyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isTaken: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return ProdInstance
}
