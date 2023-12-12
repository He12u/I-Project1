if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");
var morgan = require("morgan");
var helmet = require("helmet");

app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Router Endpoint
app.use(router);

module.exports = app;
