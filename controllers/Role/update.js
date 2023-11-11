const Role = require("../../models/role.model");

class updateRole {
  async roleExists(id) {
    try {
      const roleExists = await Role.findOne({ _id: id });
      console.log("🚀 ~ roleExists:", roleExists);
      if (!roleExists) throw "Role doesn't exists !";

      return null;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;

      await this.roleExists(id);

      const updatedRole = await Role.updateOne({ _id: id }, update);
      console.log("🚀 ~ updatedRole:", updatedRole);
      if (!updatedRole) throw "Role not updated !";

      res.status(200).json({ updatedRole });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new updateRole();
