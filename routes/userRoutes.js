const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfileImage,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.get("/profile", verifyToken, getProfile);

// 🖼 Upload / Update profile image
router.put(
  "/profile/image",
  verifyToken,
  upload.single("image"),
  updateProfileImage
);

// 📋 Get all users (not deleted)
router.get("/", verifyToken, getAllUsers);

// ❌ Soft delete user
router.delete("/:userid", verifyToken, deleteUser);

module.exports = router;
