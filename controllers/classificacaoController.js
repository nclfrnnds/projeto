const { Classificacao } = require("../models");

const classificacaoController = {

    index: async (req, res) => {
        let { page = 1 } = req.query;
        let { count:total, rows:classificacoes } = await Classificacao.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        let totalPaginas = Math.round(total/5);
        return res.render("classificacoes", { title: "Classificações", classificacoes, totalPaginas });
    },

    create: (req, res) => {
        res.render("classificacaoCadastrar", { title: "Cadastrar Classificação" });
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
        return res.render("classificacaoEditar", {title:"Editar classificação", classificacao});
    },

    update: async (req, res) => {
       const { id } = req.params;
       const { nome } = req.body;
       const classificacao = await Classificacao.update({
           nome,
           updatedAt: new Date(),
       },
       {where:{id}});
       console.log(classificacao);
       return res.redirect("/admin/ratings");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const classificacao = await Classificacao.destroy({
            where:{id},
        });
        console.log(classificacao);
        res.redirect("/admin/ratings");
    },

};

module.exports = classificacaoController;
