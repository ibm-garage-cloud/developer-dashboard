// Uncomment following to enable zipkin tracing, tailor to fit your network configuration:
// var appzip = require('appmetrics-zipkin')({
//     host: 'localhost',
//     port: 9411,
//     serviceName:'frontend'
// });

const appName = require("./../package").name;
const http = require("http");
const express = require("express");
const log4js = require("log4js");
const localConfig = require("./config/local.json");
const path = require("path");
var cookieParser = require("cookie-parser");

require('dotenv').config({ path: '.env.local'});

const logger = log4js.getLogger(appName);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/build")));

const server = http.createServer(app);

app.use(
  log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || "info" })
);
const serviceManager = require("./services/service-manager");
require("./services/index")(app);
require("./routers/index")(app, server);

// Add your code here

const port = process.env.PORT || localConfig.port;
server.listen(port, function() {
  logger.info(
    `Server listening on http://localhost:${port}/appmetrics-dash`
  );
  logger.info(`Server listening on http://localhost:${port}`);
  console.log(`Server listening on http://localhost:${port}`);

});

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public", "404.html"));
});

app.use(function(err, req, res, next) {
  res.sendFile(path.join(__dirname, "../public", "500.html"));
});
module.exports = server;
