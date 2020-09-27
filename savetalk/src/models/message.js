module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    idSend: DataTypes.INTEGER,
    idReceive: DataTypes.INTEGER,
    rolSend: DataTypes.STRING,
    rolReceive: DataTypes.STRING,
    body: DataTypes.TEXT,
    date: DataTypes.STRING,
  }, {});

  message.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return message;
};
