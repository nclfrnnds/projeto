"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("capitulos", { 
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
          visivel: Sequelize.BOOLEAN,
          notasIniciais: Sequelize.TEXT,
          titulo: Sequelize.STRING(200),
          texto: Sequelize.STRING(200),
          notasFinais: Sequelize.TEXT,
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("capitulos");
  }
};
