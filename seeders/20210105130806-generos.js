"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("generos", [
        {
          nome: "Drama",
          descricao: "gênero Drama",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          nome: "Romance",
          descricao: "gênero Romance",
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("generos", null, {});
  }
};
