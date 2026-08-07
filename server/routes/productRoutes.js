const express = require("express");

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public Route
router.get("/", getProducts);

// Admin Route
router.post("/", protect, admin, createProduct);

module.exports = router;
