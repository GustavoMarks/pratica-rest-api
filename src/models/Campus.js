"use strict";
const db = require("../config/dbConfig");

class Campus {
  // Criação de campus com parâmetro nome e cidade strings
  create(nome, cidade) {
    try {
      // Criando id inteiro com marcação de tempo
      const id = new Date().getTime();

      const data = {
        id,
        nome: String(nome),
        cidade: String(cidade),
      }

      db.push(`/campus/${id}`, data);
      db.save();

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
      throw error;
    }
  }

  // Busca um item a partir do seu id
  get(id){
    try {
      const objectData = db.getData(`/campus/${id}`);
      return objectData;

    } catch (error) {
      throw error;
    }
  }


}

module.exports = Campus;