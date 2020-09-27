module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        isNumeric: true,    
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      },
    },
  }, {});

  notification.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return notification;
};