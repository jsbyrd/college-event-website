const rostersRouter = require("express").Router();
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

// Get all RSOS that userID is admin of
rostersRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT DISTINCT R.rso_id FROM Roster R, RSO X WHERE (R.rso_id=X.rso_id AND R.user_id='${userID}' AND R.is_admin=1 AND X.num_members >= 5)`;
    const data = await sql.query(queryString);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Get specific userID & rsoID
rostersRouter.get("/:userID/:rsoID/", async (req, res) => {
  const { userID, rsoID } = req.params;

  console.log("hello");
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT COUNT(*) FROM Roster R WHERE user_id='${userID}' AND rso_id='${rsoID}'`;
    const count = await sql.query(queryString);
    res.send(count);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Create a new user
rostersRouter.post("/", async (req, res) => {
  const { userID, rsoID, isAdmin } = req.body;

  try {
    await sql.connect(sqlConfig);
    const queryString = `INSERT INTO Roster (user_id, rso_id, is_admin) VALUES ('${userID}', '${rsoID}', ${isAdmin})`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = rostersRouter;
