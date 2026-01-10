const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfileImage,
  updateAadharImage,
  updateDrivingLicenceImage,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.get("/profile", verifyToken, getProfile);

// Profile Image
router.put(
  "/profile/image",
  verifyToken,
  upload.single("image"),
  updateProfileImage
);

// Aadhar Upload
router.put(
  "/profile/aadhar",
  verifyToken,
  upload.single("aadhar"),
  updateAadharImage
);

// Driving Licence Upload
router.put(
  "/profile/driving-licence",
  verifyToken,
  upload.single("licence"),
  updateDrivingLicenceImage
);

// All users
router.get("/", verifyToken, getAllUsers);

// Soft delete
router.delete("/:userid", verifyToken, deleteUser);

module.exports = router;
