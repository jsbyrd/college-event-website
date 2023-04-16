const rsosRouter = require("express").Router();
const bcrypt = require("bcrypt");
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

rsosRouter.get("/univOnly/:univID", async (req, res) => {
  const { univID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT * FROM RSO R WHERE R.univ_id='${univID}'`;
    const result = await sql.query(queryString);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

rsosRouter.get("/:rsoID", async (req, res) => {
  const { rsoID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT * FROM RSO R WHERE R.rso_id='${rsoID}'`;
    const result = await sql.query(queryString);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

rsosRouter.post("/", async (req, res) => {
  const { userID, univID, name, description } = req.body;
  const uuid = crypto.randomUUID();

  try {
    await sql.connect(sqlConfig);
    const queryString = `INSERT INTO RSO (rso_id, user_id, univ_id, name, description, num_members) VALUES ('${uuid}', '${userID}', '${univID}', '${name}', '${description}', 1)`;
    await sql.query(queryString);
    res.json(uuid);
  } catch (err) {
    console.log(err);
  }
});

rsosRouter.put("/", async (req, res) => {
  const { rsoID } = req.body;

  try {
    await sql.connect(sqlConfig);
    const queryString = `UPDATE RSO SET num_members=num_members+1 WHERE rso_id='${rsoID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = rsosRouter;
