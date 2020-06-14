const { Historia, Classificacao, Autor, Capitulo } = require("../models");

const historiaController = {

    index: async (req, res) => {
        const historias = await Historia.findAll({
            include: {
                model: Classificacao,
            },
        });
        return res.render("historias", { title: "Histórias", historias });

        /*
        const { page = 1 } = req.query;
        const { count:total, rows:historias } = await Historia.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5,
        });
        const totalPaginas = Math.round(total/5);
        return res.render("historias", { title: "Histórias", historias, totalPaginas });
        */
    },

    create: async (req, res) => {
        const classificacoes = await Classificacao.findAll();
        return res.render("historiaPublicar", { title: "Publicar História", classificacoes });
    },

    store: async (req, res) => {
        const { 
            titulo, 
            sinopse,
            fkClassificacao,
        } = req.body;
        //const [ capa ] = req.files;
        const historia = await Historia.create({
            titulo,
            //capa,
            sinopse,
            fkClassificacao,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            include: {
                model: Classificacao,
            },
        });
        if (!historia) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        const idUsuario = req.session.usuario.id;
        const autor = await Autor.create({
            fkHistoria: historia.id,
            fkUsuario: idUsuario,
            principal: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!autor) {
            return res.render("index", { msg: "Falha ao cadastrar!" });
        }
        return res.redirect("/stories");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        const classificacoes = await Classificacao.findAll();
        return res.render("historiaEditar", { title:"Editar história", historia, classificacoes });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const {
            titulo,
            sinopse,
            fkClassificacao,
        } = req.body;
        //const [ capa ] = req.files;
        const historia = await Historia.update({
            titulo,
            //capa,
            sinopse,
            fkClassificacao,
            updatedAt: new Date(),
        }, {
            where: { id },
        }, {
            include: {
                model: Classificacao,
            },
        });
        console.log(historia);
        return res.redirect("/stories");
    },

    destroy: async(req, res) => {
        const { id } = req.params;
        const capitulos = await Capitulo.destroy({
            where: { fkHistoria: id },
        });
        console.log(capitulos);
        const autor = await Autor.destroy({
            where: { fkHistoria: id },
        });
        console.log(autor);
        const historia = await Historia.destroy({
            where: { id },
        });
        console.log(historia);
        return res.redirect("/stories");
    },

    findById: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        return res.render("historia", { title: "História", historia });
    },

};

module.exports = historiaController;
