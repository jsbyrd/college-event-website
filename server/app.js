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
const viewRostersRouter = require("./controllers/viewRosters");
const commentsRouter = require("./controllers/comments");
const superAdminRouter = require("./controllers/superAdmin");
const getEventsRouter = require("./controllers/getEvents");

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/universities", universitiesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/rsos", rsosRouter);
app.use("/api/rosters", rostersRouter);
app.use("/api/viewRosters", viewRostersRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/superAdmin", superAdminRouter);
app.use("/api/getEvents", getEventsRouter);

module.exports = app;
