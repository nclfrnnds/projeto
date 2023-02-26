"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("categorias", [
        {
          nome: "Original",
          descricao: "histórias originais",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nome: "Fanfic",
          descricao: "histórias de fãs",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("categorias", null, {});
  }
};
