const { Capitulo, Historia, Usuario, Autor } = require("../models");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { Op } = require("sequelize");
const readline = require('readline');

const capituloController = {

    index: async (req, res) => {
        const { diretorio } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulos = await Capitulo.findAll({
            where: { fkHistoria: [historia.id] },
        });
        return res.render("capitulo/index", { title: "Capítulos", historia, capitulos });
    },

    findChaptersByStory: async (req, res) => {
        const { diretorio } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulos = await Capitulo.findAll({
            include: {
                model: Historia,
                where: { diretorio: diretorio },
            },
        });
        return res.render("capitulo/listar", { title: "Capítulos", historia, capitulos });
    },

    create: async (req, res) => {
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

            return res.render("capitulo/publicar", { title: "Publicar capítulo", historia });

        }
    },

    store: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio } = req.params;

            const {
                titulo,
                texto,
                notasIniciais,
                notasFinais,
            } = req.body; 

            const nomeArquivo = Date.now();
            const caminhoCompleto = 
                path.join("uploads", "historias", diretorio, `${nomeArquivo}.txt`);
            fs.writeFileSync(caminhoCompleto, texto);

            const historia = await Historia.findOne({
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                where: { diretorio }, 
            });

            const capitulo = await Capitulo.create({
                titulo,
                texto: nomeArquivo,
                notasIniciais,
                notasFinais,
                fkHistoria: [historia.id],
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                include: {
                    model: Historia,
                },
            });
            if (!capitulo) {
                return res.render("index", {
                    msg: "Falha ao cadastrar!"
                });
            }
            return res.redirect(`/mystories/${diretorio}/chapters`);

        }
    },

    edit: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, txt } = req.params;

            const historia = await Historia.findOne({
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                where: { diretorio }, 
            });

            const capitulo = await Capitulo.findOne({
                where: {[Op.and]: [
                    { texto: txt },
                    { fkHistoria: historia.id }, 
                ]},
            });

            const caminhoCompleto =
                path.join("uploads", "historias", diretorio, `${txt}.txt`);

            const arquivoTxt = fs.readFileSync(caminhoCompleto, {
                encoding: "utf-8"
            });

            return res.render("capitulo/editar", { title:"Editar capítulo", historia, capitulo, arquivoTxt });

        }
    },

    update: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, txt } = req.params;

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
                texto,
                notasIniciais,
                notasFinais,
            } = req.body;
            
            const caminhoCompleto = 
                path.join("uploads", "historias", diretorio, `${txt}.txt`);

            fs.writeFileSync(caminhoCompleto, texto);

            await Capitulo.update({
                titulo,
                notasIniciais,
                notasFinais,
                updatedAt: new Date(),
            }, { 
                include: {
                    model: Historia,
                },
                where: {[Op.and]: [
                    { texto: txt },
                    { fkHistoria: historia.id }, 
                ]}, 
            });

            return res.redirect(`/mystories/${diretorio}/chapters`);

        }
    },

    destroy: async (req, res) => {

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, txt } = req.params;

            const historia = await Historia.findOne({
                include: {
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                },
                where: { diretorio }, 
            });

            await Capitulo.destroy({
                where: {[Op.and]: [
                    { texto: txt },
                    { fkHistoria: historia.id }, 
                ]}, 
            });

            return res.redirect(`/mystories/${diretorio}/chapters`);

        } /*else if (req.session.authAdmin) {

            const { diretorio, txt } = req.params;

            await Historia.findOne({
                where: { diretorio },
            });

            await Capitulo.destroy({ 
                where: { texto: txt }, 
            });

            return res.redirect(`/admin/story/${diretorio}/chapters`);

        }*/
    },

    findByFile: async (req, res) => {
        const { diretorio, txt } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulo = await Capitulo.findOne({
            where: { texto: txt },
        });

        const caminhoCompleto =
            path.join("uploads", "historias", diretorio, `${txt}.txt`);

        const arquivoTxt = fs.readFileSync(caminhoCompleto, {
            encoding: "utf-8"
        });

        /*const arquivoTxt = fs.readFileSync(caminhoCompleto, {
            encoding: "utf-8"
        }).split(/\r?\n/).forEach(function (line) {
            console.log(line);
        });*/

        /*const rl = readline.createInterface({
            input: fs.createReadStream(caminhoCompleto),
            crlfDelay: Infinity
        });
        
        rl.on("line", (line) => {
            console.log(line);
        });*/
        
        return res.render("capitulo/ler", { title: `História: ${historia.titulo} - ${capitulo.titulo}`, 
        capitulo, historia, arquivoTxt, diretorio, txt, moment });
    },

};

module.exports = capituloController;
