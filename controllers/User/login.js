const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const validate = require("../../lib/validate");
const loginUserSchema = require("../../jsonSchema/User/login");

class loginUser {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      console.log("🚀 ~ userExists:", userExists);
      if (userExists == null) throw "User doesn't exists !";

      return userExists;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, loginUserSchema);
      const { email, password } = req.body;

      const user = await this.userExists(email);
      console.log("🚀 ~ user:", user);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invalid password !";

      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new loginUser();
