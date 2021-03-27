const db = require("../config/dbConfig");
const CampusModel = require("../models/Campus");
const CursoModel = require("../models/Curso");
const Aluno = require("../models/Aluno");

module.exports = {
  index(req, res) {
    try {
      const aluno = new Aluno();
      const alunoList = aluno.list();
      let resultData = [];

      // Fazendo junção com cursos no dado retornado
      alunoList.forEach(item => {
        resultData.push(item);
      });

      return res.status(202).send(resultData);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  },

  show(req, res) {
    try {
      const { matricula } = req.params;
      const aluno = new Aluno();

      let alunoData = aluno.get(matricula);
      if (!alunoData) {
        return res.status(404).send({ message: "Aluno não encontrado!" });
      }

      return res.status(200).send(alunoData);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  },

  create(req, res) {
    try {
      let { codigoCurso, matricula, nome, dataNascimento, operadora, ddd, numero } = req.body;
      if (!codigoCurso || !matricula || !nome || !dataNascimento || !operadora || !ddd || !numero) {
        return res.status(400).send({ message: "Campos não especificados!" });
      }

      const curso = new CursoModel();
      const findedCurso = curso.get(codigoCurso);
      if (!findedCurso) return res.status(400).send({ message: "Curso não encontrado" });

      const aluno = new Aluno();
      let alunoData = aluno.get(matricula);
      if (alunoData) {
        return res.status(403).send({ message: "Aluno já existe!" });
      }
      const createdAluno = aluno.create(codigoCurso, matricula, nome, dataNascimento, operadora, ddd, numero);

      db.save();

      return res.status(200).send(createdAluno);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  },

  update(req, res) {
    try {
      let { codigoCurso, nome, dataNascimento, operadora, ddd, numero } = req.body;
      const { matricula } = req.params;

      if (codigoCurso) {
        const curso = new CursoModel();
        const findedCurso = curso.get(codigoCurso);
        if (!findedCurso) return res.status(400).send({ message: "Curso não encontrado" });
      }

      const aluno = new Aluno();
      const result = aluno.update(codigoCurso, matricula, nome, dataNascimento, operadora, ddd, numero);
      db.save();

      if (!result) return res.status(400).send({ message: "Aluno não encontrado!" });

      const updated = aluno.get(matricula);


      return res.status(200).send(updated);

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  },

  delete(req, res) {
    try {
      const { matricula } = req.params;
      const aluno = new Aluno();

      const result = aluno.delete(matricula);
      db.save();

      if (result) return res.sendStatus(200);
      else return res.status(404).send({ message: "Aluno não encontrado!" });

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro interno", error });
    }
  }
}