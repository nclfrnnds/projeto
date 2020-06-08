const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

const usuarioController = {

    index: async (req, res) => {
        let { page = 1 } = req.query;
        let { count:total, rows:usuarios } = await Usuario.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        let totalPagina = Math.round(total/5);
        return res.render("usuarios", { title: "Usuários", usuarios, totalPagina });
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
            return res.render("auth/signup", { msg: "Falha ao cadastrar!" });
        };
        return res.redirect("/home");
    },

    findByUsername: async (req, res) => {
        let { nomeUsuario } = req.params;
        let usuario = await Usuario.findOne({where:{nomeUsuario}});
        return res.render("usuario", {title: "Usuário", usuario});
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        return res.render("usuarioEditar", {title:"Editar usuário", usuario});
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nomeUsuario, email, senha } = req.body;
        const usuario = await Usuario.update({
            nomeUsuario,
            email,
            senha,
            /*
            nome,
            avatar,
            descricao,
            dataNascimento,
            genero,
            localizacao,
            emailSecundario,
            celular,
            moderador,
            */
            updatedAt: new Date(),
        },
        {where:{id}});
        console.log(usuario);
        return res.redirect("/users");
    },

};

module.exports = usuarioController;
