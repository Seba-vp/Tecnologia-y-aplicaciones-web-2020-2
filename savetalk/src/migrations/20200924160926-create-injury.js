module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('injuries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    description: {
      type: Sequelize.TEXT,
    },
    idPatient: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.STRING,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('injuries'),
};
