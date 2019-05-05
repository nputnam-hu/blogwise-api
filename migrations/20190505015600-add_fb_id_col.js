module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'facebookId', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'facebookId'),
}
