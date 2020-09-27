module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('dates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    painId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'pains',
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
    schedule: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    state: {
      type: Sequelize.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable('dates'),
};
