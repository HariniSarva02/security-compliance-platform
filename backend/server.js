const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const departmentRoutes = require("./routes/departmentRoutes");

const policyRoutes = require("./routes/policyRoutes");
const controlRoutes = require("./routes/controlRoutes");

const assetRoutes = require("./routes/assetRoutes");

const auditRoutes = require("./routes/auditRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const findingRoutes = require("./routes/findingRoutes");
const correctiveActionRoutes = require("./routes/correctiveActionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/policies", policyRoutes);

app.use("/api/controls", controlRoutes);
app.use("/api/assets", assetRoutes);

app.use("/api/audits", auditRoutes);

app.use("/api/evidence", evidenceRoutes);

app.use("/api/findings", findingRoutes);

app.use("/api/corrective-actions", correctiveActionRoutes);

app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Security Policy Compliance and Audit Management API is running!");
});

const PORT = process.env.PORT || 5051;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();


const { protect } = require("./middleware/authMiddleware");

// Protected route
app.get("/api/auth/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});