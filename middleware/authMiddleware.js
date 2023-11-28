const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const RESPONSE_MESSAGE = require("../lib/responseCode");

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
      const isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    res.status(400).send({
      type: RESPONSE_MESSAGE.NOT_AUTHORIZED_JWT,
      error: error.message
    });
  }
};

module.exports = authenticateUser;
