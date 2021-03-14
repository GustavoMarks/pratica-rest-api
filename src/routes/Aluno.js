const { Router } = require("express");
const AlunoController = require("../controllers/Aluno");

const routes = Router();

routes.get("/api/alunos", AlunoController.index);
routes.get("/api/alunos/:matricula", AlunoController.show);
routes.post("/api/alunos", AlunoController.create);
routes.put("/api/alunos/:matricula", AlunoController.update);
routes.delete("/api/alunos/:matricula", AlunoController.delete);

module.exports = routes;