module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Blogs', 'headerTextColor', {
      type: Sequelize.STRING,
      defaultValue: '#000000',
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Blogs', 'headerTextColor'),
}
