module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    idPacient: DataTypes.INTEGER,
    idDentist: DataTypes.INTEGER,
    block: DataTypes.BOOLEAN,
  }, {});

  chat.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return chat;
};
