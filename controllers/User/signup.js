const UserVerification = require("../../models/userVerification.model");
const User = require("../../models/user.model");
const generateToken = require("./generateToken");
const logger = require("../../lib/createFileLog");

class signup {
  process = async (req, res) => {
    try {
      const { userEmail, userOtp } = req.body;

      const userVerification = await UserVerification.findOne({
        email: userEmail,
      });

      let newUser;
      if (
        userOtp != userVerification.otp &&
        userEmail != userVerification.email
      ) {
        throw "Invalid OTP or Email!";
      }
      newUser = await User.create({
        firstName: userVerification.firstName,
        lastName: userVerification.lastName,
        userName: userVerification.userName,
        email: userVerification.email,
        password: userVerification.password,
        role: userVerification.role,
      });

      await UserVerification.deleteOne({ _id: userVerification._id });

      const childLogger = logger.child({
        email: newUser.email,
        role: newUser.role,
      });
      childLogger.log("info", `Successful login by ${newUser.userName}`);

      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new signup();
