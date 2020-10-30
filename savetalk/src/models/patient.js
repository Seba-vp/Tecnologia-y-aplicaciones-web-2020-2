const bcrypt = require('bcrypt');

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,

    picture: {
      type: DataTypes.STRING,
      defaultValue: 'jisysgzmbj2burdw53k5',
       },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    rut: DataTypes.STRING,
    isapre: DataTypes.STRING,
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

  patient.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    patient.hasMany(models.pain);
    patient.hasMany(models.chat);
    // patient.hasMany(models.message);
  };

  return patient;
};
