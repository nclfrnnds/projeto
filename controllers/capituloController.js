const { Capitulo, Historia, Classificacao } = require("../models");
const fs = require("fs");

const capituloController = {

    index: async (req, res) => {        
        const { id } = req.params;
        const historia = await Historia.findOne({where: {id},
            include: {
                model: Classificacao,
                //required: true,
            },
        });
        return res.render("capitulos", { title: "Capítulos", historia});
    },

    create: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findOne({where: {id},
            include: {
                model: Classificacao,
                //required: true,
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
                //required: true,
            },
        });
        if (!capitulo) {
            return res.render("index", {
                msg: "Falha ao cadastrar!"
            });
        }
        return res.redirect(`/story/${id}/chapters`);
    },

    /*
    edit: async (req, res) => {
        const { id } = req.params;
        const capitulo = await Capitulo.findByPk(id, {
            include: {
                model: Historia,
                //required: true,
            },
        });
        const historias = await Historia.findAll();
        return res.render("capituloEditar", {title:"Editar capítulo", capitulo, historias});
    },

    update: async (req, res) => {
        const { id } = req.params;
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
        }, {where: {id}}, {
            include: {
                model: Historia,
                //required: true,
            },
        });
        console.log(capitulo);
        return res.redirect(`/story/${id}/chapters`);
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const capitulo = await Capitulo.destroy({where: {id}});
        console.log(capitulo);
        return res.redirect(`/story/${id}/chapters`);
    },

    findById: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findOne({where: {id},
            include: {
                model: Classificacao,
                //required: true,
            },
        });
        return res.render("historia", {title: "História", historia});
    },
    */

};

module.exports = capituloController;
