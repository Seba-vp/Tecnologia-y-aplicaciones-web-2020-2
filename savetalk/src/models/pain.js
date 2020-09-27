module.exports = (sequelize, DataTypes) => {
  const pain = sequelize.define('pain', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
  }, {});

  pain.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    pain.belongsTo(models.patient);
    pain.hasMany(models.date);
  };

  return pain;
};
