const Role = require("../../models/role.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class getRole {
  process = async (req, res) => {
    try {
      const role = await Role.find();

      if (!role) throw "Role not found !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: role
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new getRole();
