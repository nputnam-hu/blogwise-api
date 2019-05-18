module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Blogs', 'googleAnalyticsToken', {
      type: Sequelize.TEXT,
    }),

  down: queryInterface =>
    queryInterface.removeColumn('Blogs', 'googleAnalyticsToken'),
}
