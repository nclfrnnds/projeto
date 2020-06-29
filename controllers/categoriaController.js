const { Categoria } = require("../models");

const categoriaController = {

    index: async (req, res) => {
        const categorias = await Categoria.findAll();
        return res.render("admin/categoria/index", { title: "Categorias", categorias });
    },

    create: (req, res) => {
        return res.render("admin/categoria/cadastrar", { title: "Cadastrar Categoria" });
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
        return res.render("admin/categoria/editar", { title:"Editar categoria", categoria });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const categoria = await Categoria.update({
            nome,
            descricao,
            updatedAt: new Date(),
        }, {
            where: { id }
        });
        console.log(categoria);
        return res.redirect("/admin/categories");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const categoria = await Categoria.destroy({
            where: { id },
        });
        console.log(categoria);
        return res.redirect("/admin/categories");
    },

};

module.exports = categoriaController;
