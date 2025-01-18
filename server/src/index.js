const http = require('http');
require('dotenv').config();
const app = require('./app');
const controller = require('./socketInit');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

controller.createConnection(server);
