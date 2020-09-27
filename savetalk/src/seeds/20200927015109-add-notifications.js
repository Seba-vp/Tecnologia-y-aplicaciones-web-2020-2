'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notificationsArray = [];

    notificationsArray.push({
      kind:'message',
      description:'Te llego un mensaje :)',
      user_id:1,
      email:'holag@hola.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });


    return queryInterface.bulkInsert('notifications', notificationsArray);
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
