const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const validate = require("../../lib/validate");
const generateToken = require("../../controllers/User/generateToken");
const loginUserSchema = require("../../jsonSchema/User/login");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const fileLogger = require("../../lib/createFileLog");
const createDBLog = require("../../lib/createDBLog");
const Role = require("../../models/role.model");

class loginUser {
  async userExists(email) {
    const userExists = await User.findOne({ email: email });
    if (userExists == null) throw "User doesn't exists !";
    return userExists;
  }

  process = async (req, res) => {
    try {
      validate(req.body, loginUserSchema);

      console.log("Request Body: ", req.body);
      console.log("Request Raw Headers: ", req.rawHeaders);
      console.log("HTTP Version: ", req.httpVersion);
      console.log("Request Method: ", req.method);
      console.log("Request URL: ", req.url);
      console.log("Hostname: ", req.hostname);
      console.log("IP: ", req.ip);
      console.log("Request Params: ", req.params);
      console.log("Request Query: ", req.query);
      console.log("Request Body: ", req.body);
      console.log("Cookies: ", req.cookies);
      //complete the string control for above

      const { email, password } = req.body;

      const user = await this.userExists(email);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invalid password !";

      //Find user role name
      const userRole = await Role.findById(user.role);
      //Log user to accessLog file
      const childLogger = fileLogger.child({
        email: user.email,
        role: user.role,
      });
      childLogger.log("info", `Successful login by ${user.userName}`);

      //Log user to accessLog Database
      const dbLogger = await createDBLog();
      dbLogger.info(`Login attempt by ${userRole.role} - ${user.userName}!`, {
        details: {
          email: user.email,
          role: userRole.role,
          userName: user.userName,
          requestMethod: req.method,
          requestURL: req.url,
          requestIP: req.ip,
          requestHostname: req.hostname,
          requestHTTPVersion: req.httpVersion,
          clientDetails: req.rawHeaders,
        },
      });

      const token = generateToken(user._id, user.role);
      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .cookie("jwt", token, options)
        .send({
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
