"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("permissoesUsuarios", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fkUsuario: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id",
            },
        },
        fkPermissao: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "permissoes",
                key: "id",
            },
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("permissoesUsuarios");
  }
};
