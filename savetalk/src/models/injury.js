module.exports = (sequelize, DataTypes) => {
  const injury = sequelize.define('injury', {
    description: DataTypes.TEXT,
    idPatient: DataTypes.INTEGER,
    category: DataTypes.STRING,
  }, {});

  injury.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return injury;
};
