module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Organizations', 'linkedinTokenExpirationDate', {
      type: Sequelize.DATE,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Organizations', 'linkedinTokenExpirationDate'),
}
