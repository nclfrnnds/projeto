const { Classificacao } = require("../models");

const classificacaoController = {

    index: async (req, res) => {
        const classificacoes = await Classificacao.findAll();
        return res.render("admin/classificacao/index", { title: "Classificações", classificacoes });

        /*
        const { page = 1 } = req.query;
        const { count:total, rows:classificacoes } = await Classificacao.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        const totalPaginas = Math.round(total/5);
        return res.render("admin/classificacao/index", { title: "Classificações", classificacoes, totalPaginas });
        */
    },

    create: (req, res) => {
        return res.render("admin/classificacao/cadastrar", { title: "Cadastrar Classificação" });
    },

    store: async (req, res) => {
        const { nome } = req.body;
        const classificacao = await Classificacao.create({
            nome,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!classificacao) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        return res.redirect("/admin/ratings");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const classificacao = await Classificacao.findByPk(id);
        return res.render("admin/classificacao/editar", { title:"Editar classificação", classificacao });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nome } = req.body;
        const classificacao = await Classificacao.update({
            nome,
            updatedAt: new Date(),
        }, {
            where: { id },
        });
        console.log(classificacao);
        return res.redirect("/admin/ratings");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const classificacao = await Classificacao.destroy({
            where: { id },
        });
        console.log(classificacao);
        return res.redirect("/admin/ratings");
    },

};

module.exports = classificacaoController;
