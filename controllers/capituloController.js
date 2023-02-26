const { Capitulo, Historia, Usuario, Autor } = require("../models");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { Op } = require("sequelize");
const readline = require("readline");

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

            const arquivo = Date.now();
            const caminhoCompleto = 
                path.join("uploads", "historias", diretorio, `${arquivo}.txt`);

            fs.writeFile(caminhoCompleto, texto, (err) => {
                if (err) throw err;
            });

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
                texto: arquivo,
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
            const { diretorio, arquivo } = req.params;

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
                    { texto: arquivo },
                    { fkHistoria: historia.id }, 
                ]},
            });

            const caminhoCompleto =
                path.join("uploads", "historias", diretorio, `${arquivo}.txt`);

            const conteudoTxt = fs.readFileSync(caminhoCompleto, {
                encoding: "utf-8"
            });

            return res.render("capitulo/editar", { title:"Editar capítulo", historia, capitulo, conteudoTxt });

        }
    },

    update: async (req, res) => {
        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, arquivo } = req.params;

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
                path.join("uploads", "historias", diretorio, `${arquivo}.txt`);

            fs.writeFile(caminhoCompleto, texto, (err) => {
                if (err) throw err;
            });

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
                    { texto: arquivo },
                    { fkHistoria: historia.id }, 
                ]}, 
            });

            return res.redirect(`/mystories/${diretorio}/chapters`);

        }
    },

    destroy: async (req, res) => {

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, arquivo } = req.params;

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
                    { texto: arquivo },
                    { fkHistoria: historia.id }, 
                ]}, 
            });

            return res.redirect(`/mystories/${diretorio}/chapters`);

        } else if (req.session.authAdmin) {

            const { diretorio, arquivo } = req.params;

            await Historia.findOne({
                where: { diretorio },
            });

            await Capitulo.destroy({ 
                where: { texto: arquivo }, 
            });

            return res.redirect(`/admin/story/${diretorio}/chapters`);

        }
    },

    findByFile: async (req, res) => {
        const { diretorio, arquivo } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulo = await Capitulo.findOne({
            where: { texto: arquivo },
        });

        const caminhoCompleto =
            path.join("uploads", "historias", diretorio, `${arquivo}.txt`);

        const fileStream = fs.createReadStream(caminhoCompleto);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const conteudoTxt = [];

        for await (const line of rl) {
            conteudoTxt.push(line + "<br />");
        };

        const conteudoCapitulo = conteudoTxt.join("");
        
        return res.render("capitulo/ler", { title: `História: ${historia.titulo} - ${capitulo.titulo}`, 
        capitulo, historia, conteudoCapitulo, diretorio, arquivo, moment });
    },

};

module.exports = capituloController;
