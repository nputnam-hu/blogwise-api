module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'facebookPageId', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'facebookPageId'),
}
