const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");

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

const authenticateEmployee = async (req, res, next) => {
  let token;

  try {
    if ("authorization" in req.headers) {
      // Get token from header
      token = req.headers.authorization;
      // Verify token6
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const roleExists = await Role.findOne({
        _id: decoded.role,
        role: "employee"
      });
      if (!roleExists) throw "Role not authorized!";

      // Get user from the token
      const isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "User not authorized !";
      }
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

const authenticateManager = async (req, res, next) => {
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

module.exports = {
  authenticateEmployee,
  authenticateManager,
  authenticateUser
};
