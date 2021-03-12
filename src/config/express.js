"use strict";
const express = require("express");
const cors = require("cors");
const app = express();

// Configurando todas as respostas em json
app.use(express.json());

// Configurando CORS para requisições sem whitelist
app.use(cors());

// Configuração porta de execução padrão do servidor
app.set("port", 3333);

module.exports = app;