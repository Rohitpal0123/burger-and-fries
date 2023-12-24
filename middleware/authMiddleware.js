const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");

const authenticateUser = async (req, res, next) => {
  let token;

  try {
    if ("authorization" in req.headers) {
      // Get token from header
      token = req.headers.authorization;
      console.log("🚀 ~ token:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }
      req.isUser = isUser;
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

const authenticateManager = async (req, res, next) => {
  try {
    const managerRole = await Role.findOne({ role: "manager" });
    if (req.isUser && req.isUser.role.equals(managerRole._id)) {
      next();
    } else {
      res.status(401);
      throw "Manager authorization required !";
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).send(error);
  }
};

const authenticateEmployee = async (req, res, next) => {
  try {
    const employeeRole = await Role.findOne({ role: "employee" });
    if (req.isUser && req.isUser.role.equals(employeeRole._id)) {
      next();
    } else {
      res.status(401);
      throw new Error("Employee authorization required !");
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).send(error);
  }
};

module.exports = {
  authenticateUser,
  authenticateManager,
  authenticateEmployee
};
