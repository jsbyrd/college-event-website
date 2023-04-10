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
