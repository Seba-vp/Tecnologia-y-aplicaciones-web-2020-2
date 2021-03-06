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
    const patientArray = [];

    patientArray.push({
      age: 20,
      name: 'Jorge',
      password: '1234',
      phone: 'none',
      address: 'none',
      city: 'Santiago',
      picture: 'none',
      email: 'j@uc.cl',
      rut: '19432542-0',
      isapre: 'fonasa',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    patientArray.push({
      age: 20,
      name: 'Pedro',
      password: '1234',
      phone: 'none',
      address: 'none',
      city: 'Santiago',
      picture: 'none',
      email: 'p@uc.cl',
      rut: '19432542-0',
      isapre: 'fonasa',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    patientArray.push({
      age: 20,
      name: 'Victoria',
      password: '1234',
      phone: 'none',
      address: 'none',
      city: 'Santiago',
      picture: 'none',
      email: 'v@uc.cl',
      rut: '19432542-0',
      isapre: 'fonasa',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('patients', patientArray);
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
