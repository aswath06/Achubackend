const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createVehicleFuel,
  getAllVehicleFuels,
  getVehicleFuelById,
} = require("../controllers/vehicleFuelController");

// 🔐 Protect all routes
router.use(authMiddleware);

// CRUD
router.post("/", createVehicleFuel);
router.get("/", getAllVehicleFuels);
router.get("/:id", getVehicleFuelById);

module.exports = router;
