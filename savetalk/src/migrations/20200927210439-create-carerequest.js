module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('carerequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    idDentist: {
      type: Sequelize.INTEGER,
    },
    idInjury: {
      type: Sequelize.INTEGER,
    },
    daterequest: {
      type: Sequelize.STRING,
    },
    datesmeeting: {
      type: Sequelize.STRING,
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.TEXT,
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

  down: (queryInterface) => queryInterface.dropTable('carerequests'),
};
