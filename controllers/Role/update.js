const validate = require("../../lib/validate");
const Role = require("../../models/role.model");
const updateRoleSchema = require("../../jsonSchema/Role/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class updateRole {
  async roleExists(id) {
    try {
      const roleExists = await Role.findOne({ _id: id });
      if (!roleExists) throw "Role doesn't exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, updateRoleSchema);

      const id = req.params.id;
      const update = req.body;

      await this.roleExists(id);

      const updatedRole = await Role.updateOne({ _id: id }, update);
      if (!updatedRole) throw "Role not updated !";

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: updatedRole
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.FAILED,
        error: error.message
      });
    }
  };
}

module.exports = new updateRole();
