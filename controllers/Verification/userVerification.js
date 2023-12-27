const UserVerification = require("../../models/userVerification.model");
const generateOtp = require("../../lib/generateOtp");

class userVerification {
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

      const otp = generateOtp(email);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userVerification = await UserVerification.Create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword,
        role: role,
        isVerified: false,
        otp: otp
      });

      res.status(200).json(`OTP sent to ${email}`);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new userVerification();
