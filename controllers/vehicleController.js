const db = require("../models");
const Vehicle = db.Vehicle;

// Map uploaded files to DB fields, keep old if not replaced
const mapImages = (files, existingVehicle = {}) => {
  return {
    rcImage: files?.rcImage ? "/images/" + files.rcImage[0].filename : existingVehicle.rcImage,
    insuranceImage: files?.insuranceImage ? "/images/" + files.insuranceImage[0].filename : existingVehicle.insuranceImage,
    pollutionImage: files?.pollutionImage ? "/images/" + files.pollutionImage[0].filename : existingVehicle.pollutionImage,
    speedImage: files?.speedImage ? "/images/" + files.speedImage[0].filename : existingVehicle.speedImage,
  };
};

// Create new vehicle
exports.createVehicle = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      vehicleName,
      vehicleNumber,
      insurance,
      pollution,
      rcDate,
      kilometer,
    } = req.body;

    const vehicleData = {
      vehicleName,
      vehicleNumber,
      insurance: insurance ? new Date(insurance) : null,
      pollution: pollution ? new Date(pollution) : null,
      rcDate: rcDate ? new Date(rcDate) : null,
      kilometer: Number(kilometer),
      ...mapImages(req.files),
    };

    console.log("FINAL VEHICLE DATA:", vehicleData);

    const vehicle = await Vehicle.create(vehicleData);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("CREATE VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const {
      insurance,
      pollution,
      rcDate,
      kilometer,
    } = req.body;

    const updatedData = {
      ...req.body,
      insurance: insurance ? new Date(insurance) : null,
      pollution: pollution ? new Date(pollution) : null,
      rcDate: rcDate ? new Date(rcDate) : null,
      kilometer: kilometer !== undefined ? Number(kilometer) : vehicle.kilometer,
      ...mapImages(req.files, vehicle),
    };

    await vehicle.update(updatedData);

    res.json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("UPDATE VEHICLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Vehicle not found" });

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle vehicle active status
exports.toggleVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.isActive = !vehicle.isActive;
    await vehicle.save();

    res.json({ message: "Vehicle status updated", isActive: vehicle.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
