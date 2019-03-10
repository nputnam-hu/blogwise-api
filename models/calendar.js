module.exports = function defineCalendar(sequelize, DataTypes) {
  const Calendar = sequelize.define('Calendar', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
  })

  Calendar.associate = function buildCalendars(models) {
    Calendar.hasMany(models.User, {
      as: 'users',
      foreignKey: 'calendarId',
    })
    Calendar.hasMany(models.CalendarPost, {
      as: 'posts',
      foreignKey: 'calendarId',
    })
  }

  return Calendar
}
