const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

const admin = (req, res, next) => {
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