const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");

router.post(
  "/add",
  userAuthentication,
  require("../controllers/Category/add").process
);
router.get(
  "/get",
  userAuthentication,
  require("../controllers/Category/get").process
);
router.put(
  "/update/:id",
  userAuthentication,
  require("../controllers/Category/update").process
);
router.delete(
  "/delete/:id",
  userAuthentication,
  require("../controllers/Category/delete").process
);

module.exports = router;
