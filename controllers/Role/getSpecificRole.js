const Role = require("../../models/role.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class getSpecificRole {
  process = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if (!role) throw new apiError(400, "Role not found !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: role,
    });
  });
}

module.exports = new getSpecificRole();
