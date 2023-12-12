const User = require("../../models/user.model");

const RESPONSE_MESSAGE = require("../../lib/responseCode");
class deleteALl {
  process = async (req, res) => {
    try {
      const deletedUser = await User.deleteMany({});

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: "Users deleted"
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new deleteALl();
