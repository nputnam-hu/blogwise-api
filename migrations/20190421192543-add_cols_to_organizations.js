module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Organizations', 'twitterToken', {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn('Organizations', 'facebookToken', {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn('Organizations', 'linkedinToken', {
        type: Sequelize.TEXT,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Organizations', 'twitterToken'),
      queryInterface.removeColumn('Organizations', 'facebookToken'),
      queryInterface.removeColumn('Organizations', 'linkedinToken'),
    ])
  },
}
