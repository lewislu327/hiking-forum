'use strict'
const faker = require('faker')
const twNationalParksList = require('../public/tw-national-park.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Mountains',
      Array.from({ length: 18 }).map((d, i) => ({
        name: twNationalParksList[i].RA_name,
        height: Math.floor(Math.random() * 4000) + 'M',
        address: twNationalParksList[i].ADDRESS,
        difficulty: Math.floor(Math.random() * 5),
        image: `https://loremflickr.com/320/240/mountain/?random=${Math.random() * 100}`,
        description: twNationalParksList[i].RA_COPY,
        createdAt: new Date(),
        updatedAt: new Date(),
        AltitudeId: Math.floor(Math.random() * 5) * 10 + 1,
      }))
    ),
      {}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mountains', null, {})
  },
}
