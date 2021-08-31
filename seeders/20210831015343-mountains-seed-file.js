'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Mountains',
      Array.from({ length: 50 }).map((d, i) => ({
        name: faker.name.findName(),
        height: Math.floor(Math.random() * 4000) + 'M',
        address: faker.address.streetAddress(),
        difficulty: Math.floor(Math.random() * 5),
        image: `https://loremflickr.com/320/240/mountain/?random=${Math.random() * 100}`,
        description: faker.lorem.text(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    ),
      {}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mountains', null, {})
  },
}
