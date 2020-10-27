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
    const DentistArray = []
    DentistArray.push({
      kind: 'true',
      speciality: 'None',
      rut: '19432542-0',
      university: 'UC',
      year: 3,
      mail: 'a@uc.cl',
      name: 'Alonso',
      password: 1234,
      picture: 'none',
      phone: 'none',
      address: 'none',
      city: 'Santiago',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    DentistArray.push({
      kind: 'true',
      speciality: 'None',
      rut: '19432542-0',
      university: 'UC',
      year: 3,
      mail: 's@uc.cl',
      name: 'Sofia',
      password: 1234,
      picture: 'none',
      phone: 'none',
      address: 'none',
      city: 'Santiago',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('dentists', DentistArray);
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
