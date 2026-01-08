const db = require("../models");
const Vehicle = db.Vehicle;

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
