const app = require("./app");
require("dotenv").config();
const http = require("http");

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
