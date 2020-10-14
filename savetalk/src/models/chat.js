module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    dentistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    block: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
  }, {});

  chat.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    chat.belongsTo(models.dentist);
    chat.belongsTo(models.patient);
  };

  return chat;
};
