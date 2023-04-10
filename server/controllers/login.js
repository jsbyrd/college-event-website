const loginRouter = require("express").Router();
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

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    await sql.connect(sqlConfig);
    const queryString = `SELECT user_id FROM "User" WHERE email='${email}' AND password='${password}'`;
    const response = await sql.query(queryString);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = loginRouter;
