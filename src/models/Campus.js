"use strict";
const db = require("../config/dbConfig");
const Curso = require("./Curso");

class Campus {
  // Criação de campus com parâmetro codigo, nome e cidade strings
  create(nome, cidade, codigo) {
    try {

      const data = {
        codigo: String(codigo),
        nome: String(nome),
        cidade: String(cidade),
      }

      db.push(`/campus/${codigo}`, data);

      return data;

    } catch (error) {
      throw error;
    }
  }

  // Lista itens do banco de dados
  list() {
    try {
      // Recebendo lista de objetos cadastrados
      const objectData = db.getData("/campus/");

      // Convertendo objeto em lista e retornando
      const listData = [];
      Object.keys(objectData).forEach(key => {
        listData.push(objectData[key]);
      });

      return listData;

    } catch (error) {
      if (error.id === 5) return []
      throw error;
    }
  }

  // Busca um item a partir do seu código
  get(codigo) {
    try {
      const objectData = db.getData(`/campus/${codigo}`);
      return objectData;

    } catch (error) {
      if (error.id === 5) return null
      throw error;
    }
  }

  // Retorna lista de cursos associados a um campus
  getCursos(codigo) {
    try {
      // Recebendo lista de objetos cadastrados
      const objectData = db.getData("/curso/");

      // Convertendo objeto em lista e retornando
      const listData = [];
      Object.keys(objectData).forEach(key => {
        const data = objectData[key];
        if (String(data.campusCodigo) === String(codigo)) listData.push(data);
      });

      return listData;

    } catch (error) {
      throw error;
    }
  }

  // Atualiza dados de um campus a partir do codigo
  update(codigo, nome, cidade) {
    try {

      let campus = this.get(codigo);
      if (!campus) return false;

      campus.nome = nome || campus.nome;
      campus.cidade = cidade || campus.cidade;

      db.push(`/campus/${codigo}`, campus, false);

      return true;

    } catch (error) {
      throw error;
    }
  }

  // Deleta um item a partir de seu id
  delete(codigo) {
    try {
      const findedCampus = this.get(codigo)
      if (!findedCampus) return null;
      db.delete(`/campus/${codigo}`);
      const curso = new Curso();
      const cursosList = this.getCursos(codigo);

      cursosList.forEach(item => {
        curso.delete(item.codigo);
      });

      // TODO Remover lista de alunos cadastrados no campus

      return true;

    } catch (error) {
      if (error.id === 5) return false
      throw error;
    }
  }

}

module.exports = Campus;