module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    idSend: {
      type: Sequelize.INTEGER,
    },
    idReceive: {
      type: Sequelize.INTEGER,
    },
    rolSend: {
      type: Sequelize.STRING,
    },
    rolReceive: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.TEXT,
    },
    date: {
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

  down: (queryInterface) => queryInterface.dropTable('messages'),
};
