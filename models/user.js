module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    amount: DataTypes.FLOAT,

    // 🔐 Forgot password fields
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
  });

  return User;
};
