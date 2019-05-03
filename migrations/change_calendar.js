module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Users', 'calendarId'),

  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('CalendarPosts', 'calendarId', {
      type: Sequelize.UUID,
    }),
}
