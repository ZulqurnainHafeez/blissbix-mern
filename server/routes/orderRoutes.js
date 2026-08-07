const express = require("express");

const {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// Customer Routes
// ===============================

router.post("/", protect, placeOrder);
router.get("/", protect, getOrders);

// ===============================
// Admin Routes
// ===============================

// Get all orders
router.get("/admin", protect, admin, getAllOrders);

// Get single order
router.get("/admin/:id", protect, admin, getOrderById);

// Update order status
router.put("/admin/:id/status", protect, admin, updateOrderStatus);

module.exports = router;