const { Historia, Classificacao, Autor, Capitulo } = require("../models");
const fs = require("fs");
const path = require("path");

const historiaController = {

    index: async (req, res) => {

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const historias = await Historia.findAll({
                include: {
                    model: Classificacao,
                },
            });
            return res.render("historia/listar", { title: "Histórias", historias });

        } else if (req.session.authAdmin) {

            const historias = await Historia.findAll({
                include: {
                    model: Classificacao,
                },
            });
            return res.render("historia/listar", { title: "Histórias", historias });

        }
    },

    create: async (req, res) => {
        const classificacoes = await Classificacao.findAll();
        return res.render("historia/publicar", { title: "Publicar História", classificacoes });
    },

    store: async (req, res) => {
        const { 
            titulo, 
            sinopse,
            fkClassificacao,
        } = req.body;
        //const [ capa ] = req.files;

        const diretorio = `${Date.now()}`;
        const historia = await Historia.create({
            diretorio,
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

        const idUsuario = req.session.authUsuario.id;
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

        fs.mkdir(path.join("uploads", "historias", 
        diretorio), { recursive: true }, (err) => {
            if (err) throw err;
        });

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
        return res.render("historia/editar", { title:"Editar história", historia, classificacoes });
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
            //capa: capa.filename,
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

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { id } = req.params;
            const capitulos = await Capitulo.destroy({
                where: { fkHistoria: id },
            });
            console.log(capitulos);
            const autor = await Autor.destroy({
                where: { fkHistoria: id },
            });
            console.log(autor);
            
            /*
            const historias = await Historia.findByPk(id);
            const diretorio = historias.diretorio;
            console.log(diretorio);
            */

            const historia = await Historia.destroy({
                where: { id },
            });
            console.log(historia);

            /*
            fs.unlink(path.join("uploads", "historias",
                diretorio), (err) => {
                if (err) throw err;
                console.log("Diretório excluído");
            });
            */

            return res.redirect("/stories");

        } else if (req.session.authAdmin) {

            const { id } = req.params;
            const capitulos = await Capitulo.destroy({
                where: { fkHistoria: id },
            });
            console.log(capitulos);
            const autor = await Autor.destroy({
                where: { fkHistoria: id },
            });
            console.log(autor);
            
            /*
            const historias = await Historia.findByPk(id);
            const diretorio = historias.diretorio;
            console.log(diretorio);
            */

            const historia = await Historia.destroy({
                where: { id },
            });
            console.log(historia);

            /*
            fs.unlink(path.join("uploads", "historias",
                diretorio), (err) => {
                if (err) throw err;
                console.log("Diretório excluído");
            });
            */

            return res.redirect("/stories");

        }
    },

    findById: async (req, res) => {
        const { id } = req.params;
        const historia = await Historia.findByPk(id, {
            include: {
                model: Classificacao,
            },
        });
        return res.render("historia/ver", { title: "História", historia });
    },

};

module.exports = historiaController;
