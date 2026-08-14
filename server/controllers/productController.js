const mongoose = require("mongoose");
const Product = require("../models/Product");

// ===============================
// REGEX HELPER
// ===============================
const escapeRegex = (value) => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// ===============================
// CREATE PRODUCT
// ===============================
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL PRODUCTS
// SEARCH + FILTER + SORT
// ===============================
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      size,
      color,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    // ===============================
    // BUILD FILTER
    // ===============================

    const filter = {};

    // ===============================
    // SEARCH
    // ===============================

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(
        escapeRegex(search.trim()),
        "i"
      );

      filter.$or = [
        { name: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ];
    }

    // ===============================
    // CATEGORY FILTER
    // ===============================

    if (category && category !== "All") {
      filter.category = new RegExp(
        `^${escapeRegex(category.trim())}$`,
        "i"
      );
    }

    // ===============================
    // SIZE FILTER
    // ===============================

    if (size && size !== "All") {
      filter.sizes = new RegExp(
        `^${escapeRegex(size.trim())}$`,
        "i"
      );
    }

    // ===============================
    // COLOR FILTER
    // ===============================

    if (color && color !== "All") {
      filter.colors = new RegExp(
        `^${escapeRegex(color.trim())}$`,
        "i"
      );
    }

    // ===============================
    // PRICE FILTER
    // ===============================

    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (
      minPrice !== undefined &&
      minPrice !== "" &&
      !Number.isNaN(min)
    ) {
      filter.price = {
        ...filter.price,
        $gte: min,
      };
    }

    if (
      maxPrice !== undefined &&
      maxPrice !== "" &&
      !Number.isNaN(max)
    ) {
      filter.price = {
        ...filter.price,
        $lte: max,
      };
    }

    // ===============================
    // SORT
    // ===============================

    let sortOption = {
      createdAt: -1,
    };

    switch (sort) {
      case "price_asc":
        sortOption = {
          price: 1,
        };
        break;

      case "price_desc":
        sortOption = {
          price: -1,
        };
        break;

      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "name_asc":
        sortOption = {
          name: 1,
        };
        break;

      case "name_desc":
        sortOption = {
          name: -1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    // ===============================
    // DATABASE QUERY
    // ===============================

    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort(sortOption);

    // ===============================
    // RESPONSE
    // ===============================

    res.status(200).json({
      success: true,

      count: products.length,

      filters: {
        search: search || "",
        category: category || "All",
        size: size || "All",
        color: color || "All",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
        sort: sort || "newest",
      },

      products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE PRODUCT
// ===============================
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: UPDATE PRODUCT
// ===============================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "images",
      "sizes",
      "colors",
      "stock",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: UPDATE PRODUCT STOCK
// ===============================
const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (
      stock === undefined ||
      typeof stock !== "number" ||
      stock < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Stock must be a number greater than or equal to 0",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.stock = stock;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product stock updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update stock error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: UPDATE PRODUCT OPTIONS
// ===============================
const updateProductOptions = async (req, res) => {
  try {
    const { id } = req.params;
    const { sizes, colors } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (sizes !== undefined) {
      if (!Array.isArray(sizes)) {
        return res.status(400).json({
          success: false,
          message: "Sizes must be an array",
        });
      }

      product.sizes = sizes;
    }

    if (colors !== undefined) {
      if (!Array.isArray(colors)) {
        return res.status(400).json({
          success: false,
          message: "Colors must be an array",
        });
      }

      product.colors = colors;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product options updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product options error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ADMIN: DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// EXPORTS
// ===============================
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductStock,
  updateProductOptions,
  deleteProduct,
};