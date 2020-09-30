module.exports = (sequelize, DataTypes) => {
  const carerequest = sequelize.define('carerequest', {
    idDentist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    idInjury: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    daterequest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    datesmeeting: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    price: {
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.TEXT
    },
  }, {});

  carerequest.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return carerequest;
};
