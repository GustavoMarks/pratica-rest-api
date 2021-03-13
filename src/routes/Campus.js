const { Router } = require("express");
const CampusController = require("../controllers/Campus");

const routes = Router();

routes.post("/api/campi", CampusController.create);

module.exports = routes;