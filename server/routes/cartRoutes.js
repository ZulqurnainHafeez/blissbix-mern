const express = require("express");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Cart Routes
router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:id", protect, updateCart);
router.delete("/:id", protect, removeFromCart);

module.exports = router;