module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      vehicleName: { type: DataTypes.STRING, allowNull: false },
      vehicleNumber: { type: DataTypes.STRING, allowNull: false, unique: true },

      // Date fields
      insurance: { type: DataTypes.DATE, allowNull: true },
      pollution: { type: DataTypes.DATE, allowNull: true },
      rcDate: { type: DataTypes.DATE, allowNull: true },

      // Image fields
      rcImage: { type: DataTypes.STRING, allowNull: true },
      insuranceImage: { type: DataTypes.STRING, allowNull: true },
      pollutionImage: { type: DataTypes.STRING, allowNull: true },
      speedImage: { type: DataTypes.STRING, allowNull: true },

      kilometer: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "vehicles",
      timestamps: true,
    }
  );

  return Vehicle;
};
