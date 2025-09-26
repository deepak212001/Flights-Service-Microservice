"use strict";
const { Op } = require("sequelize");
//op is operator
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("airplanes", [
      {
        modelNumber: "boeing99",
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing777",
        capacity: 700,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("airplanes", {
      [Op.or]: [{ modelNumber: "be6e" }, { modelNumber: "airbus a199" }],
    });
    // await queryInterface.bulkDelete("airplanes", {}); delete all data
  },
};
