'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const feedbacksArray = [];

    feedbacksArray.push({
      id_odontologo:2,
      id_user:1,
      description:'Muy buena la atencion',
      calification:5,
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
