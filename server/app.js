const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();

const app = express();

const usersRouter = require("./controllers/users");
const universitiesRouter = require("./controllers/universities");

app.use(cors());
app.use(express.json());

// app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/universities", universitiesRouter);

module.exports = app;
