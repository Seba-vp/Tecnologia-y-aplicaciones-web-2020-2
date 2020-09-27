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
    const carerequestArray = [];

    carerequestArray.push({
      idDentist: 1,
      idInjury: 1,
      daterequest: '2020/09/26',
      datesmeeting: '2020/09/26;2020/09/27;2020/09/28',
      confirmed: false,
      price: 10000,
      message: 'Yo te quiero atender porfavor!',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    carerequestArray.push({
      idDentist: 2,
      idInjury: 1,
      daterequest: '2020/09/26',
      datesmeeting: '2020/09/28;2020/09/28;2020/09/28',
      confirmed: false,
      price: 15000,
      message: 'Yo soy el mejor del mundo',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    carerequestArray.push({
      idDentist: 3,
      idInjury: 1,
      daterequest: '2020/09/26',
      datesmeeting: '2020/09/29;2020/09/30;2020/09/28',
      confirmed: false,
      price: 25000,
      message: 'No te atiendas con mediocres',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    carerequestArray.push({
      idDentist: 3,
      idInjury: 1,
      daterequest: '2020/09/25',
      datesmeeting: '2020/09/25;2020/09/26;2020/09/27',
      confirmed: false,
      price: 1000,
      message: 'Yo puedo cuando quieras',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('carerequests', carerequestArray);
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
