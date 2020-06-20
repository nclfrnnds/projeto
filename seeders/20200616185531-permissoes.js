"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("permissoes", [
        {
          nome: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nome: "Moderador",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nome: "Usuário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("permissoes", null, {});
  }
};
