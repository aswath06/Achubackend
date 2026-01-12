const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");  

const app = express();
const db = require("./models");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/images", express.static("images"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/vehicle-services", require("./routes/vehicleServiceRoutes"));
app.use("/api/bunks", require("./routes/bunkRoutes"));
app.use("/api/vehicle-fuels", require("./routes/vehicleFuelRoutes"));
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Correct bunk statements route
const bunkStatementRoutes = require("./routes/bunkStatementRoutes");
app.use("/api/bunk-statements", bunkStatementRoutes); 

// Start server
db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
