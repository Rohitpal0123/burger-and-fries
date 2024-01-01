const nodemailer = require("nodemailer");

module.exports = async (email, data) => {
  try {
    console.log("initiate");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "worthiferotp@gmail.com",
        pass: process.env.GMAIL_PASS_KEY
      }
    });

    const mailOptions = {
      from: "xcorp@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: data
    };

    const sendMail = await transporter.sendMail(mailOptions);
    console.log("🚀 ~ module.exports= ~ sendMail:", sendMail);
    if (!sendMail) throw "Failed to send Email !";

    return data;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
};
