'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notificationsArray = [];

    notificationsArray.push({
      kind:'message',
      description:'Te llego un mensaje :).',
      user_id:1,
      email:'holag@hola.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    notificationsArray.push({
      kind:'confirmation',
      description:'Han confirmado tu cita de hoy a las 16:00.',
      user_id:2,
      email:'chao@hola.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    notificationsArray.push({
      kind:'reminder',
      description:'Recuerda que tienes una atencion hoy a las 9:30.',
      user_id:3,
      email:'1313@hola.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    notificationsArray.push({
      kind:'message',
      description:'Te llego otro mensaje :)',
      user_id:4,
      email:'420g@hola.com',
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
