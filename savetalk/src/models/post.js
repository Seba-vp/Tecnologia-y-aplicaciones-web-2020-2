module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post',{
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,  
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    public: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    coordinator: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: false,    
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        isNumeric: true,     
      },
    },
    interactions: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        notEmpty: false,
        isNumeric: true,     
      },
    },

  }, {});

  post.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return post;
};