const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

// Load environment variables
dotenv.config();

// DNS servers
dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const app = express();

// ===============================
// Middleware
// ===============================

// Allow React frontend to access backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// Connect Database
// ===============================
connectDB();

// ===============================
// Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Blissbix Backend API",
    status: "success",
    version: "1.0.0",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});