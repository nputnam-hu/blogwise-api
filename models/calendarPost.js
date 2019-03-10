module.exports = function defineCalendarPost(sequelize, DataTypes) {
  const CalendarPost = sequelize.define('CalendarPost', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSONB,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
  })

  return CalendarPost
}
