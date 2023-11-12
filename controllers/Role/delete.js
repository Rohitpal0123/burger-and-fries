const Role = require("../../models/role.model");

class deleteRole {
  async roleExists(id) {
    try {
      const roleExists = await Role.findOne({ _id: id });
      console.log("🚀 ~ roleExists:", roleExists);
      if (!roleExists) throw "Role does not exists !";

      return roleExists;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const id = req.params.id;

      await this.roleExists(id);

      const deletedRole = await Role.deleteOne({ _id: id });
      console.log("🚀 ~ deletedRole:", deletedRole);
      if (!deletedRole) throw "Role not deleted !";

      res.status(400).json({ deletedRole });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new deleteRole();
