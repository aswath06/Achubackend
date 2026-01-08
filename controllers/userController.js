const { User } = require("../models");
exports.getProfile = async (req, res) => {
  try {
    console.log("USER FROM TOKEN:", req.user); // 🔍 DEBUG

    const user = await User.findOne({
      where: { userid: req.user.userid },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userid: user.userid,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      amount: user.amount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

