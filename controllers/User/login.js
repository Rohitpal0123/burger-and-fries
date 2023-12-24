const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const validate = require("../../lib/validate");
const generateToken = require("../../controllers/User/generateToken");
const loginUserSchema = require("../../jsonSchema/User/login");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class loginUser {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists == null) throw "User doesn't exists !";

      return userExists;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, loginUserSchema);
      const { email, password } = req.body;

      const user = await this.userExists(email);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invalid password !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role)
        }
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error
      });
    }
  };
}

module.exports = new loginUser();
