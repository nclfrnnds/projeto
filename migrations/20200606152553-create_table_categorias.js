"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("categorias", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        descricao: Sequelize.STRING(250),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("categorias");
  }
};
