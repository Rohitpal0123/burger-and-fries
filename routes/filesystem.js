const express = require("express");
const router = express.Router();

router.get("/writetext", require("../controllers/Files/write").process);
router.get(
  "/readtext",
  require("../controllers/Files/read").process,
  require("../controllers/Files/delete").process
);

module.exports = router;
