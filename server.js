const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./models");

/**
 * ✅ CORS – allow localhost + network access
 * (safe for development)
 */
app.use(
  cors({
    origin: true, // allow all origins in LAN
    credentials: true,
  })
);

/**
 * ✅ Middlewares
 */
app.use(express.json());
app.use("/images", express.static("images"));

/**
 * ✅ Routes
 */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));

/**
 * ✅ Start Server on Network
 */
db.sequelize.sync().then(() => {
  console.log("Database connected");

  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
    console.log(`🌐 Network access enabled`);
  });
});
