const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

const usuarioController = {

    index: (req, res) => {
        res.send("Página de usuário");
    },

    create: (req, res) => {
        res.render("auth/signup", { title: "Cadastre-se" });
    },

    store: async (req, res) => {
        const { nomeUsuario, email, senha } = req.body;
        const hashSenha =  bcrypt.hashSync(senha, 10);

        const usuario = await Usuario.create({
            nomeUsuario,
            email,
            senha: hashSenha,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if(!usuario) {
            return res.render("auth/signup", {
                msg: "Erro ao cadastrar usuário!",
            });
        };

        return res.redirect("/home");
    },

};

module.exports = usuarioController;
