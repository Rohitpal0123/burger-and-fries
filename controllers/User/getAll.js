const User = require("../../models/user.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class getAllUser {
  process = async (req, res) => {
    try {
      const users = await User.find();
      if (!users) throw "Users not found !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: users
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new getAllUser();
