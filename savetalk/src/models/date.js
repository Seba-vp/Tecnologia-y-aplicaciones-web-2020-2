module.exports = (sequelize, DataTypes) => {
  const date = sequelize.define('date', {
    painId: DataTypes.INTEGER,
    dentistId: DataTypes.INTEGER,
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {});

  date.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    date.belongsTo(models.dentist);
    date.belongsTo(models.pain);
  };

  return date;
};
