const Role = require("../../models/role.model");
const validate = require("../../lib/validate");
const addRoleSchema = require("../../jsonSchema/Role/add");

class addRole {
  async roleExists(role) {
    try {
      const roleExists = await Role.findOne({ role: role });
      if (roleExists != null) throw "Role already exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, addRoleSchema);
      const { role, isActive } = req.body;

      await this.roleExists(role);

      const newRole = await Role.create({
        role: role,
        isActive: isActive
      });
      if (!newRole) throw "Role not added";

      res.status(200).json({ newRole });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = new addRole();
