const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateUser = async (req, res, next) => {
  let token;

  try {
    if ("authorization" in req.headers) {
      // Get token from header
      token = req.headers.authorization;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = authenticateUser;
