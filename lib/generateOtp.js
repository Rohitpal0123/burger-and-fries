const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

// Create a transporter object using your email service provider settings (e.g., Gmail)
module.exports = async (email) => {
  try {
    console.log("initiate");
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email service provider
      auth: {
        user: "worthiferotp@gmail.com",
        pass: YOUR_PASS_KEY
      }
    });

    // Generate a random OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false
    });
    console.log("🚀 ~ otp:", otp);

    // Email content
    const mailOptions = {
      from: "xcorp@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`
    };

    // Send the email
    const sendMail = await transporter.sendMail(mailOptions);
    console.log("🚀 ~ module.exports= ~ sendMail:", sendMail);
    if (!sendMail) throw "Failed to send OTP";

    return otp;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
};
