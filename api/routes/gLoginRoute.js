const express = require("express");
const gLoginController = require("../controllers/gLoginController");
const router = express.Router();

router.post("/", gLoginController.googleLogin);

module.exports = router;
