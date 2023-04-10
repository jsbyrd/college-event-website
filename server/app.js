const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();

const app = express();

const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const universitiesRouter = require("./controllers/universities");
const eventsRouter = require("./controllers/events");
const rsosRouter = require("./controllers/rsos");
const rostersRouter = require("./controllers/rosters");

app.use(cors());
app.use(express.json());

// app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/universities", universitiesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/rsos", rsosRouter);
app.use("/api/rosters", rostersRouter);

module.exports = app;
