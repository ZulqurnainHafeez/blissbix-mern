const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // NEW

// Load environment variables
dotenv.config();

// Optional: Set DNS servers
dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes); // NEW

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
  console.log(`Server is running on http://localhost:${PORT}`);
});