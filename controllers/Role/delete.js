const Role = require("../../models/role.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
class deleteRole {
  async roleExists(id) {
    try {
      const roleExists = await Role.findOne({ _id: id });
      if (!roleExists) throw new Error("Role does not exists !");

      return roleExists;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const id = req.params.id;

      await this.roleExists(id);

      const deletedRole = await Role.deleteOne({ _id: id });
      console.log("🚀 ~ deletedRole:", deletedRole);
      if (!deletedRole) throw new Error("Role not deleted !");

      res.status(400).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: deletedRole
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

module.exports = new deleteRole();
