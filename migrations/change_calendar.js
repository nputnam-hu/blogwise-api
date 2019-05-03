module.exports = {
  up: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('CalendarPosts', 'calendarId'),
        queryInterface.removeColumn('Users', 'calendarId'),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'calendarId', {
          type: Sequelize.UUID,
        }),
        queryInterface.addColumn('CalendarPosts', 'calendarId', {
          type: Sequelize.UUID,
        }),
      ])
    })
  },
}
