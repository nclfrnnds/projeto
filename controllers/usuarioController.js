const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

const usuarioController = {

    index: async (req, res) => {    
        const usuarios = await Usuario.findAll();
        return res.render("usuario/index", { title: "Usuários", usuarios });
    },

    create: (req, res) => {
        if (req.session.authUsuario) {
            return res.redirect("/home");

        } else if (req.session.authAdmin) {
            return res.redirect("/admin/painel");

        } else {
            return res.render("usuario/cadastrar", { title: "Cadastre-se" });

        }
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
            return res.render("usuario/cadastrar", { msg: "Falha ao cadastrar!" });
        };

        return res.redirect("/home");
    },

    edit: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const usuario = await Usuario.findOne({
                where: { id: sessaoUsuario },
            });
            return res.render("usuario/editar", { title:"Configurações", usuario });

        } else if (req.session.authAdmin) {

            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            return res.render("usuario/editar", { title:"Editar usuário", usuario });

        }
    },

    update: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { 
                nomeUsuario, 
                email,
                //senha,
                nome,
                descricao,
                dataNascimento, 
                //genero,
                localizacao,
            } = req.body;

            //const hashSenha = bcrypt.hashSync(senha, 10);
            const [ avatar ] = req.files;

            await Usuario.update({
                nomeUsuario,
                email,
                //senha: hashSenha,
                nome,
                descricao,
                dataNascimento,
                //genero,
                localizacao,
                avatar: avatar.filename,
                updatedAt: new Date(),
            }, {
                where: { id: sessaoUsuario },
            });
            return res.redirect("/home");

        } else if (req.session.authAdmin) {

            const { id } = req.params;
            const { 
                nomeUsuario, 
                email,
                //senha,
                nome,
                descricao,
                dataNascimento, 
                //genero,
                localizacao,
            } = req.body;

            //const hashSenha = bcrypt.hashSync(senha, 10);
            const [ avatar ] = req.files;

            await Usuario.update({
                nomeUsuario,
                email,
                //senha: hashSenha,
                nome,
                descricao,
                dataNascimento,
                //genero,
                localizacao,
                avatar: avatar.filename,
                updatedAt: new Date(),
            }, {
                where: { id },
            });
            return res.redirect("/admin/users");

        }
    },

    destroy: async(req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            await Usuario.destroy({
                where: { id: sessaoUsuario },
            });
            return res.redirect("/logout");

        } else if (req.session.authAdmin) {

            const { id } = req.params;
            await Usuario.destroy({
                where: { id },
            });
            return res.redirect("/admin/users");
            
        }
    },

    findByUsername: async (req, res) => {
        const { nomeUsuario } = req.params;
        const usuario = await Usuario.findOne({
            where: { nomeUsuario },
        });
        return res.render("usuario/ver", { title: "Usuário", usuario });
    },

};

module.exports = usuarioController;
