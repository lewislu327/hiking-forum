'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Altitudes',
      ['高海拔', '中海拔', '中高海拔', '中低海拔', '低海拔'].map((item, index) => ({
        id: index * 10 + 1,
        name: item,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Altitudes', null, {})
  },
}
