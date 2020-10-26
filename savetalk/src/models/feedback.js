module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    id_date:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        isNumeric: true,    
      },
    },
    id_pain: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: true,
        isNumeric: true,    
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    calification: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: true,
        isNumeric: true,
        max: 5,
        min: 0,

      },
    },
  }, {});
  feedback.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return feedback;
};