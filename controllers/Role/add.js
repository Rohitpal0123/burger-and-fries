const Role = require("../../models/role.model");
const validate = require("../../lib/validate");
const roleSchema = require("../../jsonSchema/Role/roleSchema");

class addRole {
  async roleExists(role) {
    try {
      const roleExists = await Role.findOne({ role: role });
      console.log("🚀 ~ roleExists:", roleExists);
      if (roleExists != null) throw "Role already exists !";

      return null;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, roleSchema);
      const { role, isActive } = req.body;

      await this.roleExists(role);

      const newRole = await Role.create({
        role: role,
        isActive: isActive
      });
      console.log("🚀 ~ newRole:", newRole);
      if (!newRole) throw "Role not added";

      res.status(200).json({ newRole });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new addRole();
