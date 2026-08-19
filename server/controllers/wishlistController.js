const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate("product");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const existingItem = await Wishlist.findOne({
      user: req.user._id,
      product: req.body.product,
    });

    if (existingItem) {
      return res.status(200).json({
        success: true,
        wishlist: existingItem,
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      product: req.body.product,
    });

    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};