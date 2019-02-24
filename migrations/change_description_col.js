module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Blogs', 'description', {
      type: Sequelize.TEXT,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Blogs', 'description', {
      type: Sequelize.STRING,
    }),
}
