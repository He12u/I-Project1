const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const publicRouter = require("./publicRouter");
const userRouter = require("./userRouter");
const authentication = require("../middlewares/authentication");

router.use("/pub", publicRouter);

router.use(authentication);
router.use("/users", userRouter);

router.use(errorHandler);

module.exports = router;
