module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'twitterTokenSecret', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'twitterTokenSecret'),
}
