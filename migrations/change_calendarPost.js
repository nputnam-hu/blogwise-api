module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'calendarId'),
        queryInterface.dropTable('Calendars'),
        queryInterface.addColumn('CalendarPosts', 'userId', {
          type: Sequelize.UUID,
        }),
        queryInterface.addColumn('CalendarPosts', 'OrganizationId', {
          type: Sequelize.UUID,
        }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Calendars'),
        queryInterface.removeColumn('CalendarPosts', 'userId'),
        queryInterface.removeColumn('CalendarPosts', 'OrganizationId'),
        queryInterface.addColumn('CalendarPosts', 'calendarId', {
          type: Sequelize.UUID,
        }),
      ])
    })
  },
}
