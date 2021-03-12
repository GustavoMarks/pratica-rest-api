"use strict";
const http = require("http");
const app = require("./config/express");

// Subindo servidor da aplicação
http.createServer(app).listen(app.get("port"), () => {
  const port = app.get("port");
  console.log("##########################");
  console.log(">> SERVIDOR EM EXECUÇÃO <<");
  console.log(`>> http://localhost:${port}`);
  console.log("##########################");
});