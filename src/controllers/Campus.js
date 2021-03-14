const db = require("../config/dbConfig");
const CampusModel = require("../models/Campus");
const CursoModel = require("../models/Curso");

module.exports = {
  index(req, res) {
    try {
      const campus = new CampusModel();
      const campusList = campus.list();
      let resultData = [];

      // Fazendo junção com cursos no dado retornado
      campusList.forEach(item => {
        const cursos = campus.getCursos(item.codigo);
        resultData.push({ ...item, cursos });
      });

      return res.status(202).send(resultData);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inerno", error });
    }
  },

  show(req, res) {
    try {
      const { codigo } = req.params;
      const campus = new CampusModel();

      let campusData = campus.get(codigo);
      if (campusData) {
        const cursosList = campus.getCursos(campusData.codigo);
        campusData.cursos = cursosList;
      } else {
        return res.status(404).send({ message: "Campus não encontrado!" });
      }

      return res.status(200).send(campusData);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inerno", error });
    }
  },

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
      return res.status(200).send(result);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inerno", error });
    }
  },

  update(req, res) {
    try {
      let { nome, cidade } = req.body;
      const { codigo } = req.params;
      const campus = new CampusModel();

      campus.update(codigo, nome, cidade);
      db.save();

      const updatedCampus = campus.get(codigo);

      if (updatedCampus) {
        return res.status(202).send(updatedCampus);
      } else {
        return res.status(404).send({ message: "Campus não encontrado!" })
      }

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro inerno", error });
    }
  }
}