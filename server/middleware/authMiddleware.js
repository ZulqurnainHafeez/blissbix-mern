const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Routes
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User from DB:", req.user);

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

// Admin Middleware
const admin = (req, res, next) => {
  console.log("User Role:", req.user?.role);

  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};

module.exports = {
  protect,
  admin,
};