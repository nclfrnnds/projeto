const bcrypt = require("bcrypt");
const { Usuario } = require("../models");
const { check, validationResult, body } = require("express-validator");
const moment = require("moment");

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
        console.log(validationResult(req));

        let listaDeErros = validationResult(req);

        if (listaDeErros.isEmpty()) {

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

            return res.redirect("/login");

        } else {

            return res.render("usuario/cadastrar", {title: "Cadastre-se", errors:listaDeErros.errors});

        }


    },

    edit: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const usuario = await Usuario.findOne({
                where: { id: sessaoUsuario },
            });
            const generos = ["M", "Masculino", "F", "Feminino", "O", "Outro"];
            return res.render("usuario/editar", { title:"Configurações", usuario, generos });

        } else if (req.session.authAdmin) {

            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            const generos = ["M", "Masculino", "F", "Feminino", "O", "Outro"];
            return res.render("usuario/editar", { title:"Editar usuário", usuario , generos});

        }
    },

    update: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { 
                nomeUsuario, 
                email,
                nome,
                descricao,
                dataNascimento, 
                genero,
                localizacao,
            } = req.body;

            await Usuario.update({
                nomeUsuario,
                email,
                nome,
                descricao,
                dataNascimento,
                genero,
                localizacao,
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
                nome,
                descricao,
                dataNascimento, 
                genero,
                localizacao,
            } = req.body;

            await Usuario.update({
                nomeUsuario,
                email,
                nome,
                descricao,
                dataNascimento,
                genero,
                localizacao,
                updatedAt: new Date(),
            }, {
                where: { id },
            });
            return res.redirect("/admin/users");

        }
    },

    updatePassword: async (req, res) => {
        if (req.session.authUsuario) {

            try {
                const sessaoUsuario = req.session.authUsuario.id;
                const { senha } = req.body;
                const hashSenha = bcrypt.hashSync(senha, 10);
                const senhaAlterada = await Usuario.update({
                    senha: hashSenha,
                    updatedAt: new Date(),
                }, {
                    where: { id: sessaoUsuario },
                });
                return res.status(202).json(senhaAlterada);
            } catch (error) {
                return res.status(400).json({
                    error: true,
                    msg: "Erro na requisição. Tente novamente!",
                });
            }

        } else if (req.session.authAdmin) {

            try {
                const { id } = req.params;
                const { senha } = req.body;
                const hashSenha = bcrypt.hashSync(senha, 10);
                const senhaAlterada = await Usuario.update({
                    senha: hashSenha,
                    updatedAt: new Date(),
                }, {
                    where: { id },
                });
                return res.status(202).json(senhaAlterada);
            } catch (error) {
                return res.status(400).json({
                    error: true,
                    msg: "Erro na requisição. Tente novamente!",
                });
            }

        }

    },

    updateAvatar: async (req, res) => {
        if (req.session.authUsuario) {

            try {
                const sessaoUsuario = req.session.authUsuario.id;
                const [ avatar ] = req.files;
                const avatarAlterado = await Usuario.update({
                    avatar: avatar.filename,
                    updatedAt: new Date(),
                }, {
                    where: { id: sessaoUsuario },
                });
                return res.status(202).json(avatarAlterado);
            } catch (error) {
                return res.status(400).json({
                    error: true,
                    msg: "Erro na requisição. Tente novamente!",
                });
            }

        } else if (req.session.authAdmin) {

            try {
                const { id } = req.params;
                const [ avatar ] = req.files;
                const avatarAlterado = await Usuario.update({
                    avatar: avatar.filename,
                    updatedAt: new Date(),
                }, {
                    where: { id },
                });
                return res.status(202).json(avatarAlterado);
            } catch (error) {
                return res.status(400).json({
                    error: true,
                    msg: "Erro na requisição. Tente novamente!",
                });
            }

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
        const generos = ["M", "Masculino", "F", "Feminino", "O", "Outro"];
        return res.render("usuario/ver", { title: `Perfil: ${usuario.nomeUsuario}`, usuario, generos, moment });
    },

};

module.exports = usuarioController;
