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

    },

    public: {
      type: DataTypes.STRING,
      allowNull: true,
  
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,

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
    
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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

    },

  }, {});

  post.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return post;
};