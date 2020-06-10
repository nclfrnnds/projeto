const { Genero } = require("../models");

const generoController = {

    index: async (req, res) => {
        let { page = 1 } = req.query;
        let { count:total, rows:generos } = await Genero.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        let totalPaginas = Math.round(total/5);
        return res.render("generos", { title: "Gêneros", generos, totalPaginas });
    },

    create: (req, res) => {
        res.render("generoCadastrar", { title: "Cadastrar Gênero" });
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
        return res.render("generoEditar", {title:"Editar gênero", genero});
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const genero = await Genero.update({
            nome,
            descricao,
            updatedAt: new Date(),
        },
        {where:{id}});
        console.log(genero);
        return res.redirect("/admin/genres");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const genero = await Genero.destroy({
            where:{id},
        });
        console.log(genero);
        res.redirect("/admin/genres");
    },

};

module.exports = generoController;
