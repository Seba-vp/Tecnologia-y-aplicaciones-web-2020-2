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
    
    const postsArray = [];

    postsArray.push({
      title: 'Odonto Movil',
      description: 'Voluntariado móvil',
      public: 'Todo público',
      city: 'Todas las comunas',
      coordinator: 'Sofía Barahona',
      email:'odontomovil@gmail.com',
      location:'coordenadas varias',
      image:'insertar foto',
      id_user:'1',
      interactions:'12',
      createdAt: new Date(),
      updatedAt: new Date() 
    });



    return queryInterface.bulkInsert('posts', postsArray);

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
