const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const sql = require("mssql");
const crypto = require("crypto");
const { query } = require("express");
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

// Create a new user
usersRouter.post("/", async (req, res) => {
  const { email, password, isAdmin, univ_id } = req.body;
  const uuid = crypto.randomUUID();

  try {
    await sql.connect(sqlConfig);
    const is_super_admin = isAdmin ? 1 : 0;
    const queryString = `INSERT INTO "User" (user_id, univ_id, password, email, is_super_admin) VALUES ('${uuid}', '${univ_id}', '${password}', '${email}', '${is_super_admin}')`;
    await sql.query(queryString);
    res.json(uuid);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = usersRouter;
