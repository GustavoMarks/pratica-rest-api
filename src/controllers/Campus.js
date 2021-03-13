const db = require("../config/dbConfig");
const CampusModel = require("../models/Campus");
const CursoModel = require("../models/Curso");

module.exports = {
  create(req, res) {
    try {
      let { codigo, nome, cidade, cursos } = req.body;
      if (!codigo) {
        return res.status(400).send({ message: "Campo 'codigo' não especificado!" });
      }

      if (!nome) {
        return res.status(400).send({ message: "Campo 'nome' não especificado!" });
      }

      if (!cidade) {
        return res.status(400).send({ message: "Campo 'cidade' não especificado!" });
      }

      if (!cursos || cursos.length < 1) {
        return res.status(400).send({ message: "Lista de curso não especificada!" });
      }

      const campus = new CampusModel();
      const createdCampus = campus.create(nome, cidade, codigo);
      const createdCursos = [];

      const curso = new CursoModel();
      cursos.forEach(element => {
        if (!element.nome || !element.turno || !element.codigo) return res.status(400).send({
          message: "Campos de curso não especificados"
        });
        const createdCurso = curso.create(element.nome, element.turno, element.codigo, createdCampus.codigo);
        createdCursos.push(createdCurso);
      });

      db.save();

      const result = { ...createdCampus, createdCursos };
      return res.status(202).send(result);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inerno" });
    }
  }
}