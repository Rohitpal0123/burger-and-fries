const express = require("express");
const router = express.Router();
const userAuthentication = require("../middleware/authMiddleware");

router.post(
  "/add",
  userAuthentication,
  require("../controllers/Products/add").process
);
router.get(
  "/get",
  userAuthentication,
  require("../controllers/Products/getAll").process
);
router.get(
  "/get/:id",
  userAuthentication,
  require("../controllers/Products/getSingle").process
);
router.delete(
  "/delete/:id",
  userAuthentication,
  require("../controllers/Products/delete").process
);
router.put(
  "/update/:id",
  userAuthentication,
  require("../controllers/Products/update").process
);

module.exports = router;
