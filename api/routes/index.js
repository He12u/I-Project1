const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const postsRoute = require("./postsRoute");
const gLoginRoute = require("./gLoginRoute");
const paymentsRoute = require("./paymentsRoute");
const authentication = require("../middlewares/authentication");

router.use("/auth", authRoute);
router.use("/googleLogin", gLoginRoute);

router.use(authentication);
router.use("/payment", paymentsRoute);
router.use("/users", userRoute);

router.use(errorHandler);

module.exports = router;
