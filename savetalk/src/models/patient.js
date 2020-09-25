module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    age: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    picture: DataTypes.STRING,
    email: DataTypes.STRING,
    rut: DataTypes.STRING,
    isapre: DataTypes.STRING,
  }, {});

  patient.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return patient;
};
