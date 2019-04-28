module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'linkedinId', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'linkedinId'),
}
