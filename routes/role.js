const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware");

router.post(
  "/add",
  authenticateUser,
  require("../controllers/Role/add").process
);
router.get(
  "/get",
  authenticateUser,
  require("../controllers/Role/get").process
);
router.put(
  "/update/:id",
  authenticateUser,
  require("../controllers/Role/update").process
);
router.delete(
  "/delete/:id",
  authenticateUser,
  require("../controllers/Role/delete").process
);

module.exports = router;
