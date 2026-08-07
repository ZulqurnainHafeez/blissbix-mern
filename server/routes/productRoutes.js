const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductStock,
  updateProductOptions,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// Public Routes
// ===============================

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// ===============================
// Admin Routes
// ===============================

// Create product
router.post("/", protect, admin, createProduct);

// Update product
router.put("/:id", protect, admin, updateProduct);

// Update stock
router.put("/:id/stock", protect, admin, updateProductStock);

// Update sizes and colors
router.put("/:id/options", protect, admin, updateProductOptions);

// Delete product
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;