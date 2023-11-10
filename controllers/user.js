// const User = require("../models/user.model");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// //GET Get all user
// const getAllUser = async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users) throw "Users not found !";

//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// //Registering user
// const signupUser = async (req, res) => {
//   try {
//     console.log("here 1");
//     const { firstName, lastName, userName, email, password } = req.body;

//     const userExist = await User.findOne({ email: email });
//     console.log("🚀 ~ userExist:", userExist);
//     if (userExist != null) throw "User already exists !";

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       userName,
//       email,
//       password: hashedPassword
//     });

//     if (!newUser) throw "User not added !";
//     console.log("🚀 ~ newUser:", newUser);

//     res.status(200).json({
//       _id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       token: generateToken(newUser._id)
//     });
//   } catch (error) {
//     console.log("🚀 ~ error:", error);
//     res.status(400).json(error);
//   }
// };

// //User Login Authentication
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });
//     console.log("🚀 ~ user:", user);
//     if (user == null) throw "User doesn't exists !";
//     const isPassword = await bcrypt.compare(password, user.password);
//     if (!isPassword) {
//       throw "Invalid password!";
//     }

//     res.status(200).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//       msg: "Successfully logged in !"
//     });
//   } catch (error) {
//     console.log("🚀 ~ error:", error);
//     res.status(400).json(error);
//   }
// };

// // JWT Generation
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6h" });
// };

// module.exports = {
//   signupUser,
//   loginUser,
//   getAllUser
// };
