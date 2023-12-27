const UserVerification = require("../../models/userVerification.model");
const User = require("../../models/user.model");
const generateToken = require("../User/generateToken");

class verifiedEmailSignup {
  process = async (req, res) => {
    try {
      const { email, userOtp } = req.body;

      const userVerification = await UserVerification.find({ email: email });
      let newUser;
      if (userOtp == userVerification.otp) {
        newUser = await User.create({
          firstName: userVerification.firstName,
          lastName: userVerification.lastName,
          userName: userVerification.userName,
          email: userVerification.email,
          password: userVerification.password,
          role: userVerification.role
        });
      } else {
        throw "Invalid OTP !";
      }

      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role)
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new verifiedEmailSignup();
