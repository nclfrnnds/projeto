const { Categoria } = require("../models");

const categoriaController = {

    index: async (req, res) => {
        let { page = 1 } = req.query;
        let { count:total, rows:categorias } = await Categoria.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        let totalPaginas = Math.round(total/5);
        return res.render("categorias", { title: "Categorias", categorias, totalPaginas });
    },

    create: (req, res) => {
        res.render("categoriaCadastrar", { title: "Cadastrar Categoria" });
    },

    store: async (req, res) => {
        const { nome, descricao } = req.body;
        const categoria = await Categoria.create({
            nome,
            descricao,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!categoria) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        return res.redirect("/admin/categories");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        return res.render("categoriaEditar", {title:"Editar categoria", categoria});
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const categoria = await Categoria.update({
            nome,
            descricao,
            updatedAt: new Date(),
        },
        {where:{id}});
        console.log(categoria);
        return res.redirect("/admin/categories");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const categoria = await Categoria.destroy({
            where:{id},
        });
        console.log(categoria);
        res.redirect("/admin/categories");
    },

};

module.exports = categoriaController;
