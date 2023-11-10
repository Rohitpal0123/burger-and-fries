// const Role = require("../models/role.model");
// const validate = require("../lib/validate");
// const roleSchema = require("../schema/roleSchema");

// //POST role
// const addRole = async (req, res) => {
//   try {
//     validate(req.body, roleSchema);
//     console.log("Validaed !!");
//     const { role, isActive } = req.body;
//     const newRole = await Role.create({
//       role: role,
//       isActive: isActive
//     });

//     if (!newRole) throw "Role not added !";

//     res.status(200).json({ newRole });
//   } catch (error) {
//     console.log("Error: ", error);

//     res.status(400).json(error);
//   }
// };

// //GET Role
// const getRole = async (req, res) => {
//   try {
//     const role = await Role.find();

//     if (!role) throw "Role not found !";

//     res.status(200).json({ role });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

// //UPDATE Role
// const updateRole = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const update = req.body;

//     const roleExists = await Role.findOne({ _id: id });
//     console.log("roleExists: ", roleExists);
//     if (!roleExists) throw "Role doesn't exists !";

//     const updatedRole = await Role.updateOne({ _id: id }, update);
//     console.log("updateRole: ", updateRole);
//     if (updatedRole.modifiedCount != 1) throw "Role not updated !";

//     res.status(200).json({ updatedRole });
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(400).json(error);
//   }
// };

// //DELETE role
// const deleteRole = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const roleExists = await Role.findOne({ _id: id });
//     console.log("roleExists: ", roleExists);
//     if (!roleExists) throw "Role doesn't exists !";

//     const deletedRole = await Role.deleteOne({ _id: id });
//     console.log("deletedRole: ", deletedRole);
//     if (!deletedRole) throw "Role not deleted !";

//     res.status(200).json({ deletedRole });
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(400).json(error);
//   }
// };

// module.exports = {
//   addRole,
//   getRole,
//   updateRole,
//   deleteRole
// };
