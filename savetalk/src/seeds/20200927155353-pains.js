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
    const PATIENT_NAME = 'Jorge';
    const PAINS_QUANTITY = 2;

    const patients = await queryInterface.sequelize.query(
      `SELECT id FROM patients WHERE name='${PATIENT_NAME}'`
    );
    const { id: patientId } = patients[0][0];
    const painsData = [];
    for (let i=0; i < PAINS_QUANTITY; i+= 1) {
      painsData.push({
        patientId,
        name: `Dolor ${i + 1}`,
        description: `Me duele mucho la muela ${i + 1}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('pains', painsData);
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
