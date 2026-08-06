const Cart = require("../models/Cart");

// ===============================
// Add to Cart
// ===============================
const addToCart = async (req, res) => {
  try {
    const { product, size, color, quantity } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product,
      size,
      color,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });
    }

    const cart = await Cart.create({
      user: req.user._id,
      product,
      size,
      color,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get User Cart
// ===============================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");

    res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Cart Quantity
// ===============================
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (cart.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    cart.quantity = req.body.quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Remove Cart Item
// ===============================
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (cart.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cart.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};