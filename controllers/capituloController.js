const { Capitulo, Historia, Classificacao } = require("../models");
const fs = require("fs");

const capituloController = {

    index: async (req, res) => {        
        const { id } = req.params;
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        const capitulos = await Capitulo.findAll({
            where: { fkHistoria: id },
            include: {
                model: Historia,
            },
        });
        return res.render("capitulos", { title: "Capítulos", historia, capitulos });
    },

    create: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        return res.render("capituloPublicar", { title: "Publicar Capítulo", historia });
    },

    store: async (req, res) => {
        const { id } = req.params;
        const {
            titulo,
            texto,
            notasIniciais,
            notasFinais,
        } = req.body;
        const capitulo = await Capitulo.create({
            titulo,
            texto,
            notasIniciais,
            notasFinais,
            fkHistoria: id,
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
        return res.redirect(`/story/${id}/chapters`);
    },

    edit: async (req, res) => {
        const { id, idChapter } = req.params;
        const capitulo = await Capitulo.findByPk(idChapter, {
            include: {
                model: Historia,
            },
        });
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        return res.render("capituloEditar", { title:"Editar capítulo", capitulo, historia });
    },

    update: async (req, res) => {
        const { id, idChapter } = req.params;
        const {
            titulo,
            texto,
            notasIniciais,
            notasFinais,
        } = req.body;
        const capitulo = await Capitulo.update({
            titulo,
            texto,
            notasIniciais,
            notasFinais,
            updatedAt: new Date(),
        }, {
            where: { id: idChapter }
        }, {
            include: {
                model: Historia,
            },
        });
        console.log(capitulo);
        return res.redirect(`/story/${id}/chapters`);
    },

    destroy: async(req, res) => {
        const { id, idChapter } = req.params;
        const capitulo = await Capitulo.destroy({
            where: { id: idChapter },
        });
        console.log(capitulo);
        return res.redirect(`/story/${id}/chapters`);
    },

    findById: async (req, res) => {
        const { id, idChapter } = req.params;
        const capitulo = await Capitulo.findByPk(idChapter, {
            include: {
                model: Historia,
            },
        });
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        return res.render("capitulo", { title: "Capítulo", capitulo, historia });
    },

};

module.exports = capituloController;
