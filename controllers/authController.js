const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

const authController = {

    index: (req, res) => {
        res.render("index", { title: "Início" });
    },

    home: (req, res) => {
        res.render("home", { title: "Início" });
    },

    admin: (req, res) => {
        res.render("admin", { title: "Admin" });
    },

    create: (req, res) => {
        res.render("auth/login", { title: "Entre" });
    },

    store: async (req, res) => {
        const { email, senha } = req.body;

        const [usuario] = await Usuario.findAll({ where: { email } })
        
        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.render("auth/login", {
               title: "Entre",
               msg: "E-mail ou senha incorretos!", 
            });
        }

        req.session.usuario = {
            id: usuario.id,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
        };

        return res.redirect("/home");
    },

    destroy: (req, res) => {
        req.session = undefined;
        return res.redirect("/login");
    },

};

module.exports = authController;