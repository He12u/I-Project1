const express = require("express");
const midtransController = require("../controllers/midtransController");
const router = express.Router();

router.post("/midtrans/token", midtransController.getToken);

module.exports = router;
