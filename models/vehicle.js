module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vehicleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      insurance: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pollution: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rcDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      // 🔥 New Fields
      kilometer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "vehicles",
      timestamps: true,
    }
  );

  return Vehicle;
};
