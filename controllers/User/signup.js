const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const validate = require("../../lib/validate");
const signupUserSchema = require("../../jsonSchema/User/signup");

class signupUser {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists != null) throw "User already exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }

  process = async (req, res) => {
    try {
      validate(req.body, signupUserSchema);
      const { firstName, lastName, userName, email, password } = req.body;

      await this.userExists(email);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword
      });

      if (!newUser) throw "User not signed up !";

      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        token: generateToken(newUser._id)
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new signupUser();
