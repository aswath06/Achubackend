module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      userRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3, // 1=Admin, 2=Driver, 3=Customer
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE,
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};
