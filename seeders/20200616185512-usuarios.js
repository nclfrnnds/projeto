"use strict";

const bcrypt = require("bcrypt");
const hashSenha = bcrypt.hashSync("123", 10);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("usuarios", [
        { 
          //1
          nomeUsuario: "nicoli",
          email: "nicoli@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, { 
          //2
          nomeUsuario: "nico",
          email: "nico@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //3
          nomeUsuario: "bev",
          email: "bev@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //4
          nomeUsuario: "richie",
          email: "richie@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //5
          nomeUsuario: "eddie",
          email: "eddie@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //6
          nomeUsuario: "stan",
          email: "stan@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //7
          nomeUsuario: "mike",
          email: "mike@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //8
          nomeUsuario: "ben",
          email: "ben@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          //9
          nomeUsuario: "bill",
          email: "bill@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("usuarios", null, {});
  }
};
