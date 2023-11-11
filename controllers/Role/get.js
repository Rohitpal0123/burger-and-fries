const Role = require("../../models/role.model");

class getRole {
  process = async (req, res) => {
    try {
      const role = await Role.find();

      if (!role) throw "Role not found !";

      res.status(200).json({ role });
    } catch (error) {
      console.log("Error:", error);
    }
  };
}

module.exports = new getRole();
