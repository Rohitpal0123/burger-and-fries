const otpGenerator = require("otp-generator");
function generateOtp() {
  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });
    if (!otp) throw "Otp not generated !";

    return otp;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
}

module.exports = generateOtp;
