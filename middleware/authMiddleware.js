const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateUser = async (req, res, next) => {
  let token;

  if ("authorization" in req.headers) {
    try {
      // Get token from header
      token = req.headers.authorization;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }

      next();
    } catch (error) {
      res.status(400).json({
        type: "Error",
        error: error.error || error
      });
    }
  }

  if (!req.headers.authorization) {
    res.status(400).json({
      type: "Error",
      error: "Not authorized"
    });
  }
};

module.exports = authenticateUser;
