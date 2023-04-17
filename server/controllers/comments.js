const commentsRouter = require("express").Router();
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

commentsRouter.get("/:eventID", async (req, res) => {
  const { eventID } = req.params;
  try {
    await sql.connect(sqlConfig);
    queryString = `SELECT * FROM Comment C WHERE C.event_id='${eventID}'`;
    const result = await sql.query(queryString);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

commentsRouter.post("/", async (req, res) => {
  const { userID, eventID, description } = req.body;
  const commentID = crypto.randomUUID();
  try {
    await sql.connect(sqlConfig);
    // First get the email of the user
    queryString1 = `SELECT U.email FROM "User" U WHERE U.user_id='${userID}'`;
    const result = await sql.query(queryString1);
    queryString = `INSERT INTO Comment (comment_id, user_id, event_id, description, email) VALUES ('${commentID}', '${userID}', '${eventID}', '${description}', '${result.recordset[0].email}')`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

commentsRouter.put("/", async (req, res) => {
  const { commentID, description } = req.body;
  try {
    await sql.connect(sqlConfig);
    queryString = `UPDATE Comment SET description='${description}' WHERE comment_id='${commentID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

commentsRouter.delete("/:commentID", async (req, res) => {
  const { commentID } = req.params;
  try {
    await sql.connect(sqlConfig);
    queryString = `DELETE FROM Comment WHERE comment_id='${commentID}'`;
    await sql.query(queryString);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = commentsRouter;
