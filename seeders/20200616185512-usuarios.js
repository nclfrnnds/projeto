"use strict";

const bcrypt = require("bcrypt");
const hashSenha = bcrypt.hashSync("123", 10);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("usuarios", [
        {
          nomeUsuario: "maria",
          email: "maria@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nomeUsuario: "joao",
          email: "joao@email.com",
          senha: hashSenha,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nomeUsuario: "jose",
          email: "jose@email.com",
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
