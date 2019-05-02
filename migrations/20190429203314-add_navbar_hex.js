module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Blogs', 'navbarHexCode', {
      type: Sequelize.STRING,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Blogs', 'navbarHexCode'),
}
