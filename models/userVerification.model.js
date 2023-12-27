const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true
    },
    isVerified: {
      type: Boolean,
      required: true
    },
    otp: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userVerification = mongoose.model("User", userVerificationSchema);
module.exports = userVerification;
