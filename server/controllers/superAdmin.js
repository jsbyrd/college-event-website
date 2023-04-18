const superAdminRouter = require("express").Router();
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

superAdminRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT DISTINCT E.event_id, E.name, E.description FROM Event E, "User" U WHERE U.user_id='${userID}' AND E.univ_id=U.univ_id AND E.access='public' AND E.is_approved=0`;
    const result = await sql.query(queryString);
    res.json(result).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Subtract from num_members
superAdminRouter.put("/", async (req, res) => {
  const { eventID } = req.body;
  try {
    await sql.connect(sqlConfig);
    const queryString = `UPDATE Event SET is_approved=1 WHERE event_id='${eventID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

superAdminRouter.delete("/:eventID", async (req, res) => {
  const { eventID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `DELETE FROM Event WHERE event_id='${eventID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = superAdminRouter;
