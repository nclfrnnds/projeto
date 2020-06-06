"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("categorias", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          categoria: Sequelize.STRING(100),
          descricao: Sequelize.STRING(250),
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("categorias");
  }
};
