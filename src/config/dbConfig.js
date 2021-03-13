"use strict";
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

// Configuranções do db.json, sem salvamento automático, utilizando "/" como separador
const db = new JsonDB(new Config("db.json", false, false, "/"));

module.exports = db;