"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("classificacoes", [
        {
          nome: "Livre",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nome: "Restrita",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("classificacoes", null, {});
  }
};
