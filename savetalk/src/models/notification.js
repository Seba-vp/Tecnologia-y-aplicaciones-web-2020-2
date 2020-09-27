module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    kind: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
  }, {});

  notification.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return notification;
};