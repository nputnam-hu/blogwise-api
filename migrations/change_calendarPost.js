module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'calendarId'),
        queryInterface.removeColumn('CalendarPosts', 'userId'),
        queryInterface.addColumn('CalendarPosts', 'authorId', {
          type: Sequelize.UUID,
        }),
        queryInterface.addColumn('CalendarPosts', 'OrganizationId', {
          type: Sequelize.UUID,
        }),
        queryInterface.dropTable('Calendars'),
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
