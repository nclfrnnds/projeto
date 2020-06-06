"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("generos", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          genero: Sequelize.STRING(100),
          descricao: Sequelize.STRING(250),
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("generos");
  }
};
