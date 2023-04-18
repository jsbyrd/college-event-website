const viewRostersRouter = require("express").Router();
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

viewRostersRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT DISTINCT R.rso_id, X.name, X.description FROM Roster R, RSO X WHERE R.user_id='${userID}' AND R.rso_id=X.rso_id`;
    const result = await sql.query(queryString);
    res.json(result).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Get whether or not user is admin of rso
viewRostersRouter.get("/:userID/:rsoID/", async (req, res) => {
  const { userID, rsoID } = req.params;

  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT COUNT(*) FROM Roster R WHERE R.user_id='${userID}' AND R.rso_id='${rsoID}' AND R.is_admin=1`;
    const count = await sql.query(queryString);
    res.json(count).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Remove user from rso
viewRostersRouter.delete("/:userID/:rsoID", async (req, res) => {
  const { userID, rsoID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `DELETE FROM Roster WHERE user_id='${userID}' AND rso_id='${rsoID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Subtract from num_members
viewRostersRouter.put("/", async (req, res) => {
  const { rsoID } = req.body;
  try {
    await sql.connect(sqlConfig);
    const queryString = `UPDATE RSO SET num_members=num_members-1 WHERE rso_id='${rsoID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = viewRostersRouter;
