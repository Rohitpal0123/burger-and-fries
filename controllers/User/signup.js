const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const validate = require("../../lib/validate");
const signupUserSchema = require("../../jsonSchema/User/signup");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const Role = require("../../models/role.model");

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

  async roleExists(role) {
    try {
      const roleExists = await Role.findOne({ _id: role });
      if (!roleExists) throw "Role does not exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }

  process = async (req, res) => {
    try {
      validate(req.body, signupUserSchema);
      const { firstName, lastName, userName, email, password, role } = req.body;

      await this.userExists(email);

      await this.roleExists(role);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword,
        role: role
      });

      if (!newUser) throw "User not signed up !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          _id: newUser._id,
          email: newUser.email,
          role: newUser.role,
          token: generateToken(newUser._id, newUser.role)
        }
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new signupUser();
