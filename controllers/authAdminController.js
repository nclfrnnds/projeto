const bcrypt = require("bcrypt");
const { Usuario, Permissao, PermissaoUsuario } = require("../models");
const { Op } = require("sequelize");

const authAdminController = {

    index: (req, res) => {
        return res.render("painel", { title: "Painel Admin" });
    },

    create: (req, res) => {
        const logado = req.session.authAdmin;
        if (!logado) {
            return res.render("auth/admin", { title: "Admin" });
        } else {
            return res.redirect("/admin/painel");
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

            const {count: totalPermissoes, rows: permissoesUsuario} 
            = await PermissaoUsuario.findAndCountAll({
                include: {
                    model: Permissao,
                },
                where: { fkUsuario: usuario.id },
            });

            let listaDeIndices = [];
            const arrayAdmin = ["Admin", "admin", "Administrador", "administrador"];                
            permissoesUsuario.forEach(permissaoUsuario => {
                arrayAdmin.forEach(admin => {
                    const indice = (permissaoUsuario.Permissao.nome).includes(admin);
                    listaDeIndices.push(indice);
                });
            });
            const verificaAdmin = listaDeIndices.includes(true);

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

module.exports = authAdminController;
