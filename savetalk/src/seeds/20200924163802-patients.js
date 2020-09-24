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
    
    const patientsArray = [];

    patientsArray.push({
      age: 22,
      name: 'Rodolfo Mendoza Lucar',
      phone: '+56987117169',
      address: 'Paso del Roble 311',
      city: 'Santiago',
      picture: 'No tengo foto aún',
      email: 'email@gmail.com',
      rut: '19900400-k',
      isapre: 'Cruz blanca',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    patientsArray.push({
      age: 33,
      name: 'Arturo Vidal',
      phone: '+56987117188',
      address: 'calle de Milan',
      city: 'Milan',
      picture: 'No tengo foto aún',
      email: 'kingArturo@gmail.com',
      rut: '18900400-k',
      isapre: 'Cruz blanca',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('patients', patientsArray);

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
