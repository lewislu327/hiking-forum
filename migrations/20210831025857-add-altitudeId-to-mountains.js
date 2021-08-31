'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Mountains', 'AltitudeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Altitudes',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Mountains', 'AltitudeId')
  },
}
