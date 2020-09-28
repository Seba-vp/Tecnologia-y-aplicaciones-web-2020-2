module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    idSend: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    idReceive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    rolSend: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    rolReceive: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
  }, {});

  message.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return message;
};
