const UserVerification = require("../../models/userVerification.model");
const User = require("../../models/user.model");
const generateToken = require("../User/generateToken");

class verifiedEmailSignup {
  process = async (req, res) => {
    try {
      const { userEmail, userOtp } = req.body;
      console.log("🚀 ~ userEmail:", userEmail);
      console.log("🚀 ~ userOtp:", userOtp);

      const userVerification = await UserVerification.findOne({
        email: userEmail
      });

      console.log("🚀 ~ userVerification:", userVerification);
      console.log("🚀 ~ userVerification.otp:", userVerification.otp);

      let newUser;
      if (
        userOtp == userVerification.otp &&
        userEmail == userVerification.email
      ) {
        throw "Invalid OTP or Email!";
      }
      newUser = await User.create({
        firstName: userVerification.firstName,
        lastName: userVerification.lastName,
        userName: userVerification.userName,
        email: userVerification.email,
        password: userVerification.password,
        role: userVerification.role
      });

      await UserVerification.deleteOne({ _id: userVerification._id });
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
