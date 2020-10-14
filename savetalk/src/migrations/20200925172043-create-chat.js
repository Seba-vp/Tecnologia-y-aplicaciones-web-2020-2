module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    patientId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    dentistId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'dentists',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    block: {
      type: Sequelize.BOOLEAN,
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

  down: (queryInterface) => queryInterface.dropTable('chats'),
};
