module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    idPacient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    idDentist: {
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

  chat.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return chat;
};
