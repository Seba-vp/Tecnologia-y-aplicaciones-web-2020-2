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
      idPacient: 1,
      idDentist: 1,
      block: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    chatsArray.push({
      idPacient: 1,
      idDentist: 2,
      block: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    chatsArray.push({
      idPacient: 1,
      idDentist: 3,
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
