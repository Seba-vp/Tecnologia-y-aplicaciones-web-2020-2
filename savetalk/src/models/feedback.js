module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    id_odontologo: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    description: DataTypes.STRING,
    calification: DataTypes.INTEGER,
  }, {});
  feedback.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return feedback;
};