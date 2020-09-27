module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post',{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    public: DataTypes.STRING,
    city: DataTypes.STRING,
    coordinator: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    interactions: DataTypes.INTEGER,
  }, {});

  post.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return post;
};