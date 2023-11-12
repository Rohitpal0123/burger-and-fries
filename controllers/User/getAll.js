const User = require("../../models/user.model");

class getAllUser {
  process = async (req, res) => {
    try {
      const users = await User.find();
      if (!users) throw "Users not found !";

      res.status(200).json({ users });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getAllUser();
