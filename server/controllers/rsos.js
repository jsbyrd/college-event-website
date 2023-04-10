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

rsosRouter.post("/", async (req, res) => {
  const { userID, univID, name, description } = req.body;
  const uuid = crypto.randomUUID();

  try {
    await sql.connect(sqlConfig);
    const queryString = `INSERT INTO RSO (rso_id, user_id, univ_id, name, description) VALUES ('${uuid}', '${userID}', '${univID}', '${name}', '${description}')`;
    await sql.query(queryString);
    res.json(uuid);
  } catch (err) {
    console.log(err);
  }
});

module.exports = rsosRouter;
