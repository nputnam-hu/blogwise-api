module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('CalendarPosts', 'authorId', {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        }),
        queryInterface.addColumn('CalendarPosts', 'OrganizationId', {
          type: Sequelize.UUID,
          references: {
            model: 'Organizations',
            key: 'id',
          },
        }),
        queryInterface.dropTable('Calendars'),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Calendars'),
        queryInterface.removeColumn('CalendarPosts', 'authorId'),
        queryInterface.removeColumn('CalendarPosts', 'OrganizationId'),
      ])
    })
  },
}
