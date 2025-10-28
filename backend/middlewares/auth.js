const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(404);
        throw new Error("No authorized user found!!");
      }

      return next();
    } catch (error) {
      console.error("authMiddleware error:", error.message);
      res.status(401);
      throw new Error("Not authorized - invalid token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Token Provided");
  }
});

module.exports = {
  protect,
};
