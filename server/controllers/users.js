const usersRouter = require("express").Router();
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

console.log("This works!");

const test = async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`SELECT * FROM Location`);
    result.recordset.forEach((location) => {
      console.log(location.name);
    });
  } catch (err) {
    console.log("This is an error message :(");
  }
};
test();

usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Create password hash
  const saltRounds = 10;
  const passwordhash = await bcrypt.hash(password, saltRounds);
});

module.exports = usersRouter;
