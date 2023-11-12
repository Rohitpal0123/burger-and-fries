const express = require("express");
const router = express.Router();

const userAuthentication = require("../middleware/authMiddleware");

router.post(
  "/add",
  userAuthentication,
  require("../controllers/Role/add").process
);
router.get(
  "/get",
  userAuthentication,
  require("../controllers/Role/get").process
);
router.put(
  "/update/:id",
  userAuthentication,
  require("../controllers/Role/update").process
);
router.delete(
  "/delete/:id",
  userAuthentication,
  require("../controllers/Role/delete").process
);

module.exports = router;
