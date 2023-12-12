const express = require("express");
const Controller = require("../controllers/Controller");
const router = express.Router();

router.post("", Controller.register);

module.exports = router;
