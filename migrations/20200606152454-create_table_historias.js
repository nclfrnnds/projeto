"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("historias", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          visivel: Sequelize.BOOLEAN,
          titulo: Sequelize.STRING(200),
          sinopse: Sequelize.TEXT,
          capa: Sequelize.STRING(200),
          status: Sequelize.BOOLEAN,
          interativa: Sequelize.BOOLEAN,
          fkClassificacao: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "classificacoes",
              key: "id",
            },
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("historias");
  }
};
