"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("historias", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fkClassificacao: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "classificacoes",
                key: "id",
            },
        },
        titulo: Sequelize.STRING(200),
        capa: Sequelize.STRING(200),
        sinopse: Sequelize.TEXT,
        finalizada: Sequelize.BOOLEAN,
        interativa: Sequelize.BOOLEAN,
        visivel: Sequelize.BOOLEAN,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("historias");
  }
};
