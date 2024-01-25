const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const validate = require("../../lib/validate");
const generateToken = require("../../controllers/User/generateToken");
const loginUserSchema = require("../../jsonSchema/User/login");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const fileLogger = require("../../lib/createFileLog");
const createDBLog = require("../../lib/createDBLog");

class loginUser {
  async userExists(email) {
    const userExists = await User.findOne({ email: email });
    if (userExists == null) throw "User doesn't exists !";
    return userExists;
  }

  process = async (req, res) => {
    try {
      validate(req.body, loginUserSchema);
      const dbLogger = await createDBLog();
      const { email, password } = req.body;

      const user = await this.userExists(email);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invalid password !";

      //Log user to accessLog file
      const childLogger = fileLogger.child({
        email: user.email,
        role: user.role,
      });
      childLogger.log("info", `Successful login by ${user.userName}`);

      //Log user to accessLog Database
      dbLogger.info({
        message: `${user.userName} successfully logged in!`,
        email: user.email,
        role: user.role,
      });
      const token = generateToken(user._id, user.role);
      console.log("🚀 ~ token:", token);
      const options = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("jwt", token, options);
      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message,
      });
    }
  };
}

module.exports = new loginUser();
