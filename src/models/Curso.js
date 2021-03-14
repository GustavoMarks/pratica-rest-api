"use strict";
const db = require("../config/dbConfig");

class Curso {
  // Criação de curso com parâmetro nome e cidade strings
  create(nome, turno, codigoCurso, codigoCampus) {
    try {

      const data = {
        codigo: codigoCurso,
        nome: String(nome),
        turno: String(turno),
        campusCodigo: String(codigoCampus)
      }

      db.push(`/curso/${codigoCurso}`, data);

      return data;

    } catch (error) {
      throw error;
    }
  }

  // Lista itens do banco de dados
  list() {
    try {
      // Recebendo lista de objetos cadastrados
      const objectData = db.getData("/curso/");

      // Convertendo objeto em lista e retornando
      const listData = [];
      Object.keys(objectData).forEach(key => {
        listData.push(objectData[key]);
      });

      return listData;

    } catch (error) {
      if (error.id === 5) return [];
      throw error;
    }
  }

  // Busca um item a partir do seu codigo
  get(codigo) {
    try {
      const objectData = db.getData(`/curso/${codigo}`);
      return objectData;

    } catch (error) {
      if (error.id === 5) return null
      throw error;
    }
  }

  // Deleta um item a partir de seu codigo
  delete(codigo) {
    try {
      db.delete(`/curso/${codigo}`);

    } catch (error) {
      throw error;
    }
  }

}

module.exports = Curso;