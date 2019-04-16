module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'linkedinToken', {
      type: Sequelize.TEXT,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Users', 'linkedinToken', {
      type: Sequelize.TEXT,
    }),
}
