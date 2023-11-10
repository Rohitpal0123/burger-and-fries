const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw "Please check your token authentication !";
    console.log("Token:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED ", jwt.decodedToken);
    if (!decodedToken.id) throw decodedToken.message;

    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = userAuthentication;
