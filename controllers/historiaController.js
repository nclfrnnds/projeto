const { Historia, Classificacao, Autor, Capitulo, Usuario} = require("../models");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const historiaController = {

    index: async (req, res) => {
        const historias = await Historia.findAll();
        return res.render("historia/index", { title: "Histórias", historias });
    },

    findStoriesByUser: async (req, res) => {
        const sessaoUsuario = req.session.authUsuario.id;              
        const historias = await Historia.findAll({
            include: {
                model: Usuario,
                through: Autor,
                where: { id: sessaoUsuario },
            },
        });
        return res.render("historia/listar", { title: "Histórias", historias });
    },

    create: async (req, res) => {
        const classificacoes = await Classificacao.findAll();
        return res.render("historia/publicar", { title: "Publicar história", classificacoes });
    },

    store: async (req, res) => {

        const { 
            titulo, 
            sinopse,
            fkClassificacao,
            finalizada,
        } = req.body;
        //const [ capa ] = req.files;

        const diretorio = `${Date.now()}`;
        const historia = await Historia.create({
            diretorio,
            titulo,
            //capa: capa.filename,
            sinopse,
            fkClassificacao,
            finalizada: finalizada ? 1 : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            include: {
                model: Classificacao,
            },
        });

        if (!historia) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }

        const idUsuario = req.session.authUsuario.id;
        const autor = await Autor.create({
            fkHistoria: historia.id,
            fkUsuario: idUsuario,
            principal: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        if (!autor) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }

        fs.mkdir(path.join("uploads", "historias", 
        diretorio), { recursive: true }, (err) => {
            if (err) throw err;
        });

        return res.redirect("/mystories");
    },

    edit: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio } = req.params;

            const historia = await Historia.findOne({
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                include: {
                    model: Classificacao,
                },
                where: { diretorio }, 
            });
            
            const classificacoes = await Classificacao.findAll();
            return res.render("historia/editar", { title:"Editar história", historia, classificacoes });

        }
    },

    update: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio } = req.params; 

            const historia = await Historia.findOne({ 
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                where: { diretorio }, 
            });

            const {
                titulo,
                sinopse,
                fkClassificacao,
                finalizada,
            } = req.body;
            //const [ capa ] = req.files;

            await Historia.update({
                titulo,
                //capa: capa.filename,
                sinopse,
                fkClassificacao,
                finalizada: finalizada ? 1 : 0,
                updatedAt: new Date(),
            }, {
                include: {
                    model: Classificacao,
                },
                where: { id: [historia.id] },
            });

            return res.redirect("/mystories");

        }
    },

    destroy: async(req, res) => {

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio } = req.params;
            const historia = await Historia.findOne({ 
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                where: { diretorio }, 
            });

            await Capitulo.destroy({ where: { fkHistoria: [historia.id] }, });

            await Autor.destroy({ where: { fkHistoria: [historia.id] }, });

            await Historia.destroy({
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                }, 
                where: { diretorio },
            });

            /* fs.unlink(path.join("uploads", "historias",
                diretorio), (err) => {
                if (err) throw err;
                console.log("Diretório excluído");
            }); */

            return res.redirect("/mystories");

        } else if (req.session.authAdmin) {

            const { diretorio } = req.params;
            const historia = await Historia.findOne({ where: { diretorio }, });

            await Capitulo.destroy({ where: { fkHistoria: [historia.id] }, });

            await Autor.destroy({ where: { fkHistoria: [historia.id] }, });
            
            await Historia.destroy({ where: { diretorio }, });

            /* fs.unlink(path.join("uploads", "historias",
                diretorio), (err) => {
                if (err) throw err;
                console.log("Diretório excluído");
            }); */

            return res.redirect("/admin/stories");

        }
    },

    findByDirectory: async (req, res) => {
        const { diretorio } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
                include: {
                    model: Classificacao,
                },
        });

        const usuario = await Usuario.findOne({
            include: {
                model: Historia,
                through: Autor,
                where: { diretorio },
            },
        });

        const capitulos = await Capitulo.findAll({
            where: { fkHistoria: [historia.id] },
        });

        return res.render("historia/ler", { title: `História: ${historia.titulo}`, historia, usuario, capitulos, moment });
    },

};

module.exports = historiaController;
