const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
db.Vehicle.hasMany(db.VehicleService, {
  foreignKey: "vehicleId",
  as: "services",
});

db.VehicleService.belongsTo(db.Vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});
db.Bunk = require("./Bunk")(sequelize, Sequelize.DataTypes);
db.Vehicle.hasMany(db.VehicleFuel, { foreignKey: "vehicleId", as: "fuels" });
db.VehicleFuel.belongsTo(db.Vehicle, { foreignKey: "vehicleId", as: "vehicle" });

db.Bunk.hasMany(db.VehicleFuel, { foreignKey: "bunkId", as: "fuels" });
db.VehicleFuel.belongsTo(db.Bunk, { foreignKey: "bunkId", as: "bunk" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
