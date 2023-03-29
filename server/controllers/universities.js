const universitiesRouter = require("express").Router();
const bcrypt = require("bcrypt");
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

universitiesRouter.get("/", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`SELECT * FROM University`);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

module.exports = universitiesRouter;
