const universitiesRouter = require("express").Router();
const bcrypt = require("bcrypt");
const sql = require("mssql");
const crypto = require("crypto");
require("dotenv").config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  server: process.env.SERVER,
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true
  }
};

// Fetch all universities
universitiesRouter.get("/", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT * FROM University U`;
    const response = await sql.query(queryString);
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

// Fetch univ_id for a given user
universitiesRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT univ_id FROM "User" U WHERE U.user_id='${userID}'`;
    const response = await sql.query(queryString);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

universitiesRouter.post("/", async (req, res) => {
  const { name } = req.body;
  const uuid = crypto.randomUUID();

  const queryString = `INSERT INTO University (univ_id, location, name, num_students, description) VALUES ('${uuid}', NULL, '${name}',  NULL, NULL)`;

  try {
    await sql.connect(sqlConfig);
    await sql.query(queryString);
  } catch (err) {
    console.log(err);
  }

  res.json(uuid);
});

module.exports = universitiesRouter;
