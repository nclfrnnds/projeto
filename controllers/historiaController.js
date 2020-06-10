const { Historia, Classificacao } = require("../models");

const historiaController = {

    index: async (req, res) => {
        let { page = 1 } = req.query;
        let { count:total, rows:historias } = await Historia.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        let totalPaginas = Math.round(total/5);
        return res.render("historias", { title: "Histórias", historias, totalPaginas });
    },

    create: (req, res) => {
        res.render("historiaPublicar", { title: "Publicar História" });
    },

    store: async (req, res) => {
        const { 
            titulo, 
            sinopse,
        } = req.body;
        //const [ capa ] = req.files;
        //const { usuario } = req.session;
        const historia = await Historia.create({
            titulo,
            //capa,
            sinopse,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { 
            include: {
                model: Classificacao,
                association: Classificacao,
                required: true,
            },
        });
        if (!historia) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        return res.redirect("/stories");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findByPk(id);
        return res.render("historiaEditar", {title:"Editar história", historia});
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { titulo, sinopse } = req.body;
        //const [ capa ] = req.files;
        const historia = await Historia.update({
            titulo,
            //capa,
            sinopse,
            updatedAt: new Date(),
        },
        {where:{id}});
        console.log(historia);
        return res.redirect("/stories");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const historia = await Historia.destroy({
            where:{id},
        });
        console.log(historia);
        res.redirect("/stories");
    },

    findById: async (req, res) => {
        let { id } = req.params;
        let historia = await Historia.findOne({where:{id}});
        return res.render("historia", {title: "História", historia});
    },

};

module.exports = historiaController;
