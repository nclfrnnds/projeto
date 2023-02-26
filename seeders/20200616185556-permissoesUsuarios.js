"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("permissoesUsuarios", [
        {
          fkUsuario: 1,
          fkPermissao: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 2,
          fkPermissao: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 3,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 4,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 5,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 6,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 7,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 8,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          fkUsuario: 9,
          fkPermissao: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("permissoesUsuarios", null, {});
  }
};
