const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const authentication = require("../middlewares/authentication");

router.use("/auth", authRoute);

router.use(authentication);
router.use("/users", userRoute);

router.use(errorHandler);

module.exports = router;
