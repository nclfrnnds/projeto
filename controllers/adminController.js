const bcrypt = require("bcrypt");
const { Usuario, Permissao, PermissaoUsuario } = require("../models");
const { Op } = require("sequelize");

const adminController = {

    index: (req, res) => {
        return res.render("painel", { title: "Painel Admin" });
    },

    create: (req, res) => {
        if (req.session.authAdmin) {
            return res.redirect("/admin/painel");
        } else if (req.session.authUsuario) {
            return res.redirect("/home");
        } else {
            return res.render("auth/admin", { title: "Admin" });
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

        if (usuario) {

            const {count: totalPermissoes, rows: permissoesUsuario} = 
            await PermissaoUsuario.findAndCountAll({
                include: {
                    model: Permissao,
                },
                where: { fkUsuario: usuario.id },
            });

            const arrayAdmin = ["Admin", "admin", "Administrador", "administrador"];                
            const verificaAdmin = permissoesUsuario.map(permissaoUsuario => {
                arrayAdmin.map(admin => {
                    (permissaoUsuario.Permissao.nome).includes(admin);
                });
            });

            if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
                return res.render("auth/admin", {
                    title: "Admin",
                    erroLogin: "E-mail ou senha incorretos!",
                });
            } else if (totalPermissoes == 0 || !verificaAdmin) {
                return res.render("auth/admin", {
                    title: "Admin",
                    erroLogin: "O usuário não possui acesso a esta área!",
                });
            } else {
                req.session.authAdmin = {
                    id: usuario.id,
                    nomeUsuario: usuario.nomeUsuario,
                    email: usuario.email,
                };
                return res.redirect("/admin/painel");
            };

        } else {

            return res.render("auth/admin", {
                title: "Admin",
                erroLogin: "O usuário não existe no sistema!",
            });

        };

    },

    destroy: (req, res) => {
        req.session.authAdmin = undefined;
        return res.redirect("/");
    },

};

module.exports = adminController;
