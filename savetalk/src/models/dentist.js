module.exports = (sequelize, DataTypes) => {
  const dentist = sequelize.define('dentist', {
    kind: DataTypes.STRING,
    speciality: DataTypes.STRING,
    rut: DataTypes.STRING,
    university: DataTypes.STRING,
    year: DataTypes.INTEGER,
    mail: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {});

  dentist.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return dentist;
};
