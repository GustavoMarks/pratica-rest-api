"use strict";
const { data } = require("../config/dbConfig");
const db = require("../config/dbConfig");

class Campus {
  // Criação de aluno
  create(codigoCurso, matricula, nome, dataNascimento, operadora, ddd, numero) {
    try {

      // Verificando se aluno já existe
      const findedAluno = this.get(matricula);
      if (findedAluno) return false;

      const data = {
        cursoCogido: codigoCurso,
        nome: String(nome),
        dataNascimento: String(dataNascimento),
        telefone: { operadora, ddd, numero }
      }

      db.push(`/aluno/${matricula}`, data);

      return data;

    } catch (error) {
      throw error;
    }
  }

  // Lista itens do banco de dados
  list() {
    try {
      // Recebendo lista de objetos cadastrados
      const objectData = db.getData("/aluno/");

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

  // Busca um item a partir do sua matricula
  get(matricula) {
    try {
      const objectData = db.getData(`/aluno/${matricula}`);
      return objectData;

    } catch (error) {
      if (error.id === 5) return null
      throw error;
    }
  }

  // Update de dados de aluno
  update(codigoCurso, matricula, nome, dataNascimento, operadora, ddd, numero) {
    try {

      // Verificando se aluno já existe
      const findedAluno = this.get(matricula);
      if (!findedAluno) return false;

      const data = {
        cursoCogido: codigoCurso || findedAluno.cursoCogido,
        nome: String(nome) || findedAluno.nome,
        dataNascimento: String(dataNascimento) || findedAluno.dataNascimento,
        telefone: {
          operadora: operadora || findedAluno.telefone.operadora,
          ddd: ddd || findedAluno.telefone.ddd,
          numero: numero || findedAluno.telefone.numero
        }
      }

      db.push(`/aluno/${matricula}`, data, false);

      return data;

    } catch (error) {
      throw error;
    }
  }


  // Deleta um item a partir de seu id
  delete(matricula) {
    try {
      const findedCampus = this.get(matricula)
      if (!findedCampus) return null;
      db.delete(`/aluno/${matricula}`);

      return true;

    } catch (error) {
      if (error.id === 5) return false
      throw error;
    }
  }

}

module.exports = Campus;