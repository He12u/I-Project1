const express = require("express");
const controller = require("../controllers/Controller");
const router = express.Router();

router.get("", controller.home);

module.exports = router;
