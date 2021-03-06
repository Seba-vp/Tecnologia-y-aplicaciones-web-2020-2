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
    const messagesArray = [];

    messagesArray.push({
      idSend: 1,
      idReceive: 1,
      chatId: 1,
      rolSend: 'Dentist',
      rolReceive: 'Patient',
      body: 'Hola! tenemos hora hoy!',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    messagesArray.push({
      idSend: 1,
      idReceive: 1,
      chatId: 1,
      rolSend: 'Patient',
      rolReceive: 'Dentist',
      body: 'Sii ¿a las 18:30?',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    messagesArray.push({
      idSend: 1,
      idReceive: 2,
      chatId: 2,
      rolSend: 'Dentist',
      rolReceive: 'Patient',
      body: 'Hola!! tenemos hora hoy',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    messagesArray.push({
      idSend: 2,
      idReceive: 1,
      chatId: 2,
      rolSend: 'Patient',
      rolReceive: 'Dentist',
      body: 'Oh se me había olvidado ¿a las 19:30?',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    messagesArray.push({
      idSend: 1,
      idReceive: 3,
      chatId: 3,
      rolSend: 'Dentist',
      rolReceive: 'Patient',
      body: 'Hola!! tenemos hora hoy',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    messagesArray.push({
      idSend: 3,
      idReceive: 1,
      chatId: 3,
      rolSend: 'Patient',
      rolReceive: 'Dentist',
      body: 'Estoy anciose',
      date: '2020/09/26',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('messages', messagesArray);
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
