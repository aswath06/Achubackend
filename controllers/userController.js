const { User } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userid: req.user.userid,
        isDeleted: false,
      },
      attributes: [
        "userid",
        "name",
        "email",
        "phoneNumber",
        "amount",
        "imageUrl",
        "userRole",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/images/${req.file.filename}`;

    await User.update(
      { imageUrl },
      {
        where: {
          userid: req.user.userid,
          isDeleted: false,
        },
      }
    );

    res.json({
      message: "Profile image updated",
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isDeleted: false },
      attributes: { exclude: ["password"] },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.update(
      { isDeleted: true },
      { where: { userid: req.params.userid } }
    );

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
