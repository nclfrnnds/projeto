"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("usuarios", { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomeUsuario: {
            type: Sequelize.STRING(50),
            unique: true,
        },
        email: {
            type: Sequelize.STRING(200),
            unique: true,
        },
        senha: Sequelize.STRING(200),
        nome: Sequelize.STRING(200),
        avatar: Sequelize.STRING(200),
        descricao: Sequelize.TEXT,
        dataNascimento: Sequelize.DATEONLY,
        genero: Sequelize.STRING(1),
        localizacao: Sequelize.STRING(100),
        emailSecundario: {
            type: Sequelize.STRING(200),
            unique: true,
        },
        celular: {
            type: Sequelize.BIGINT,
            unique: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("usuarios");
  }
};
