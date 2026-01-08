module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    amount: DataTypes.FLOAT,
  });

  return User;
};
