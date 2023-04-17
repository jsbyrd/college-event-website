const eventsRouter = require("express").Router();
const sql = require("mssql");
const crypto = require("crypto");
require("dotenv").config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  server: process.env.SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false
  }
};

eventsRouter.get("/:eventID", async (req, res) => {
  const { eventID } = req.params;
  try {
    await sql.connect(sqlConfig);
    queryString = `SELECT * FROM Event E WHERE E.event_id='${eventID}'`;
    const result = await sql.query(queryString);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

eventsRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  // CHANGE THIS LATER TO GET EVENTS SPECIFIC TO USER
  try {
    await sql.connect(sqlConfig);
    queryString = `SELECT DISTINCT E.event_id, E.name, E.description FROM Event E, "User" U, Roster R WHERE E.is_approved=1 AND (E.access='public' OR U.univ_id=E.univ_id OR (U.user_id='${userID}' AND E.rso_id=R.rso_id))`;
    const result = await sql.query(queryString);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

eventsRouter.post("/", async (req, res) => {
  const {
    name,
    univID,
    location,
    description,
    category,
    email,
    phone,
    access,
    rsoID,
    date,
    time,
    isApproved
  } = req.body;
  const eventID = crypto.randomUUID();
  try {
    await sql.connect(sqlConfig);
    const queryString = `INSERT INTO Event (event_id, univ_id, rso_id, name, description, location, access, category, date, time, email, phone, is_approved) VALUES ('${eventID}', '${univID}', ${
      rsoID === null ? null : `'${rsoID}'`
    }, '${name}', '${description}', '${location}', '${access}', '${category}', '${date}', '${time}', '${email}', '${phone}', ${isApproved})`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = eventsRouter;
