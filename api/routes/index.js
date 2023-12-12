const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const publicRouter = require("./publicRouter");

// const authentication = require("../middlewares/authentication");

router.use("/register", publicRouter);

router.use(errorHandler);

module.exports = router;
