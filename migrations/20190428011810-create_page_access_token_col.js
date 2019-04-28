module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'facebookPageToken', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'facebookPageToken'),
}
