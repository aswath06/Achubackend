const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./models");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));

db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
