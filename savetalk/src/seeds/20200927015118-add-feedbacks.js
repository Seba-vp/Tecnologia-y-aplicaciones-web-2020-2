'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const feedbacksArray = [];

    feedbacksArray.push({
      id_odontologo:1,
      id_user:1,
      description:'Muy buena la atencion.',
      calification:5,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    feedbacksArray.push({
      id_odontologo:2,
      id_user:2,
      description:'Mas o menos nomas, estaba ediondo :$.',
      calification:3,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    feedbacksArray.push({
      id_odontologo:3,
      id_user:3,
      description:'Se equivoco de muela :( .',
      calification:4,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    feedbacksArray.push({
      id_odontologo:4,
      id_user:4,
      description:'No llego nunca.',
      calification:0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('feedbacks', feedbacksArray);
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
