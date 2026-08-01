const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Force DNS servers (optional)
dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

// Check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Blissbix Backend API",
    status: "success",
    version: "1.0.0",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});