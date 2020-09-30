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
      image:'https://image.shutterstock.com/image-vector/cartoon-tooth-giving-thumb-260nw-602566124.jpg',
      id_user:'1',
      interactions:'12',
      createdAt: new Date(),
      updatedAt: new Date() 
    });

    postsArray.push({
      title: 'Cruz Dental',
      description: 'Voluntariado',
      public: 'Todo público',
      city: 'Dentro de la Region Metropolitana',
      coordinator: 'Dr Simi',
      email:'cruzdental@gmail.com',
      location:'coordenadas varias',
      image:'https://www.ovejeronoticias.cl/wp-content/uploads/2019/05/dr-simi.jpg',
      id_user:'2',
      interactions:'11',
      createdAt: new Date(),
      updatedAt: new Date() 
    });
  
    postsArray.push({
      title: 'Redes',
      description: 'Voluntariado de red',
      public: 'Todo público',
      city: 'Todas las comunas',
      coordinator: 'Dr. House',
      email:'redes@gmail.com',
      location:'coordenadas varias',
      image:'https://m.media-amazon.com/images/M/MV5BMTAxNzE5NTc4NTdeQTJeQWpwZ15BbWU3MDE5NjU1OTE@._V1_.jpg',
      id_user:'3',
      interactions:'13',
      createdAt: new Date(),
      updatedAt: new Date() 
    });
  
    postsArray.push({
      title: 'Diente Amigo',
      description: 'Voluntariado de 31 minutos',
      public: 'Niños de hasta 2 años',
      city: 'Huachipato',
      coordinator: 'Tulio triviño',
      email:'dienteamigo@gmail.com',
      location:'coordenadas varias',
      image:'https://pbs.twimg.com/media/DVPTuWiWsAEBIoz.jpg',
      id_user:'4',
      interactions:'198',
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
