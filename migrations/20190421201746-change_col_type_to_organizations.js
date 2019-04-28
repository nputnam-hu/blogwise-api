module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Organizations', 'twitterToken', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('Organizations', 'facebookToken', {
        type: Sequelize.TEXT,
      }),
      queryInterface.changeColumn('Organizations', 'linkedinToken', {
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
