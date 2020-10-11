const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const dentist = sequelize.define('dentist', {
    kind: DataTypes.STRING,
    speciality: DataTypes.STRING,
    rut: DataTypes.STRING,
    university: DataTypes.STRING,
    year: DataTypes.INTEGER,
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    picture: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    hooks: {
      beforeSave: async (instance) => {
        if (instance.changed('password')) {
          /* eslint-disable-next-line no-param-reassign */
          instance.password = await bcrypt.hash(instance.password, 10);
        }
      },
    },
  });

  dentist.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    dentist.hasMany(models.date);
  };

  return dentist;
};
