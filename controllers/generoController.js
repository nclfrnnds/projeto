const { Genero } = require("../models");

const generoController = {

    index: async (req, res) => {
        const generos = await Genero.findAll();
        return res.render("admin/genero/index", { title: "Gêneros", generos });
    },

    create: (req, res) => {
        return res.render("admin/genero/cadastrar", { title: "Cadastrar Gênero" });
    },

    store: async (req, res) => {
        const { nome, descricao } = req.body;
        const genero = await Genero.create({
            nome,
            descricao,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!genero) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        return res.redirect("/admin/genres");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const genero = await Genero.findByPk(id);
        return res.render("admin/genero/editar", { title:"Editar gênero", genero });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const genero = await Genero.update({
            nome,
            descricao,
            updatedAt: new Date(),
        }, {
            where: { id },
        });
        console.log(genero);
        return res.redirect("/admin/genres");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const genero = await Genero.destroy({
            where: { id },
        });
        console.log(genero);
        return res.redirect("/admin/genres");
    },

};

module.exports = generoController;
