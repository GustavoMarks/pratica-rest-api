const { Router } = require("express");
const CampusController = require("../controllers/Campus");

const routes = Router();

routes.get("/api/campi", CampusController.index);
routes.get("/api/campi/:codigo", CampusController.show);
routes.post("/api/campi", CampusController.create);

module.exports = routes;