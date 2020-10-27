'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const chatsArray = [];

    chatsArray.push({
      patientId: 1,
      dentistId: 1,
      block: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    chatsArray.push({
      patientId: 2,
      dentistId: 1,
      block: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    chatsArray.push({
      patientId: 3,
      dentistId: 1,
      block: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('chats', chatsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
