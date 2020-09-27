module.exports = (sequelize, DataTypes) => {
  const carerequest = sequelize.define('carerequest', {
    idDentist: DataTypes.INTEGER,
    idInjury: DataTypes.INTEGER,
    daterequest: DataTypes.STRING,
    datesmeeting: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    message: DataTypes.TEXT,
  }, {});

  carerequest.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return carerequest;
};
