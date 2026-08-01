const express = require("express");

const {
  createProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, createProduct);

module.exports = router;