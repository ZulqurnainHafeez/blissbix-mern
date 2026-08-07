const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ===============================
// Place Order
// ===============================
const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;
    const items = [];

    // Check products and stock before creating order
    for (const item of cartItems) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "One of the products in your cart no longer exists",
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${item.product.name}`,
        });
      }

      totalPrice += item.product.price * item.quantity;

      items.push({
        product: item.product._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.product.price,
      });
    }

    // Reduce product stock
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    // Clear cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get My Orders
// ===============================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: Get All Orders
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: Get Single Order
// ===============================
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: Update Order Status
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = [
      "Pending",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Returned",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    const updatedOrder = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product");

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};