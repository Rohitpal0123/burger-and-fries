const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  console.log("role", role);
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "6h" });
};

module.exports = generateToken;
