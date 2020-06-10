"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("generosHistoria", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fkHistoria: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "historias",
                key: "id",
            },
        },
        fkGenero: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "generos",
                key: "id",
            },
        },
        principal: Sequelize.BOOLEAN,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("generosHistoria");
  }
};
