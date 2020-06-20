const bcrypt = require("bcrypt");
const { Usuario } = require("../models");
const { Op } = require("sequelize");

const authController = {

    home: (req, res) => {
        const logado = req.session.authUsuario;
        if (!logado) {
            return res.render("index", { title: "Início" });
        } else {
            return res.redirect("/home");
        }
    },

    index: (req, res) => {
        return res.render("home", { title: "Início" });
    },

    create: (req, res) => {
        const logado = req.session.authUsuario;
        if (!logado) {
            return res.render("auth/login", { title: "Entre" });
        } else {
            return res.redirect("/home");
        }
    },

    store: async (req, res) => {
        const { login, senha } = req.body;
        const [usuario] = await Usuario.findAll({
            where: {[Op.or]:[
                { email: login }, 
                { nomeUsuario: login },
            ]},
        });
        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.render("auth/login", {
                title: "Entre",
                erroLogin: "E-mail ou senha incorretos!", 
            });
        } else {
            req.session.authUsuario = {
            id: usuario.id,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            };
            return res.redirect("/home");
        }
    },

    destroy: (req, res) => {
        req.session.authUsuario = undefined;
        return res.redirect("/");
    },

};

module.exports = authController;
