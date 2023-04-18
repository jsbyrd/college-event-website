const getEventsRouter = require("express").Router();
const sql = require("mssql");
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

getEventsRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await sql.connect(sqlConfig);
    queryString = `SELECT DISTINCT E.event_id, E.name, E.description, E.access FROM Event E, "User" U, Roster R WHERE E.is_approved=1 AND (E.access='public' OR (E.access='private' AND U.user_id='${userID}' AND U.univ_id=E.univ_id) OR (E.access='rso' AND R.user_id='${userID}' AND E.rso_id=R.rso_id))`;
    const result = await sql.query(queryString);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = getEventsRouter;
