if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router Endpoint
app.use(router);

module.exports = app;
