const eventsRouter = require("express").Router();
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

eventsRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  // CHANGE THIS LATER TO GET EVENTS SPECIFIC TO USER
  try {
    await sql.connect(sqlConfig);
    queryString = `SELECT * FROM Event E`;
    const result = await sql.query(queryString);
    console.log(result);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

module.exports = eventsRouter;
