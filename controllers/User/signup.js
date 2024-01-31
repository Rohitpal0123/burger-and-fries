const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const generateToken = require("../User/generateToken");
const logger = require("../../lib/createFileLog");

class signup {
  async roleExists(role) {
    const roleExists = await Role.findById(role);
    if (!roleExists) throw "Role doesn't exist !";
    return null;
  }

  async emailExists(email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) throw "Email already exists !";
    return null;
  }

  process = async (req, res) => {
    try {
      const { _id, firstName, lastName, userName, email, password, role } =
        req.body;

      await this.emailExists(email);
      await this.roleExists(role);

      const newUser = await User.create({
        _id,
        firstName,
        lastName,
        userName,
        email,
        password,
        role,
      });

      const childLogger = logger.child({
        email: newUser.email,
        role: newUser.role,
      });
      childLogger.log("info", `Successful login by ${newUser.userName}`);

      const token = generateToken(newUser._id, newUser.role);
      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .cookie("jwt", token, options)
        .json({
          _id: newUser._id,
          email: newUser.email,
          role: newUser.role,
          token: generateToken(newUser._id, newUser.role),
        });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new signup();

// const { userEmail, userOtp } = req.body;

// const userVerification = await UserVerification.findOne({
//   email: userEmail,
// });

// let newUser;
// if (
//   userOtp != userVerification.otp &&
//   userEmail != userVerification.email
// ) {
//   throw "Invalid OTP or Email!";
// }
// newUser = await User.create({
//   firstName: userVerification.firstName,
//   lastName: userVerification.lastName,
//   userName: userVerification.userName,
//   email: userVerification.email,
//   password: userVerification.password,
//   role: userVerification.role,
// });

// await UserVerification.deleteOne({ _id: userVerification._id });
