const { Capitulo, Historia, Usuario, Autor } = require("../models");
const fs = require("fs");
const path = require("path");

const capituloController = {

    index: async (req, res) => {
        const { diretorio } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulos = await Capitulo.findAll({
            where: { fkHistoria: [historia.id] },
        });
        return res.render("capitulo/index", { title: "Capítulos", historia, capitulos });
    },

    create: async (req, res) => {
        const { diretorio } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        return res.render("capitulo/publicar", { title: "Publicar Capítulo", historia });
    },

    store: async (req, res) => {
        const { diretorio } = req.params;
        const {
            titulo,
            texto,
            notasIniciais,
            notasFinais,
        } = req.body; 

        const nomeArquivo = Date.now();
        const caminhoCompleto = 
            path.join("uploads", "historias", diretorio, `${nomeArquivo}.txt`);
        fs.writeFileSync(caminhoCompleto, texto);

        const historia = await Historia.findOne({
            where: { diretorio },
        });

        const capitulo = await Capitulo.create({
            titulo,
            texto: nomeArquivo,
            notasIniciais,
            notasFinais,
            fkHistoria: [historia.id],
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            include: {
                model: Historia,
            },
        });
        if (!capitulo) {
            return res.render("index", {
                msg: "Falha ao cadastrar!"
            });
        }
        return res.redirect(`/story/${diretorio}/chapters`);
    },

    edit: async (req, res) => {
        const { diretorio, txt } = req.params;

        const historia = await Historia.findOne({
            where: { diretorio },
        });

        const capitulo = await Capitulo.findOne({
            where: { texto: txt },
        });

        const caminhoCompleto =
            path.join("uploads", "historias", diretorio, `${txt}.txt`);

        const arquivoTxt = fs.readFileSync(caminhoCompleto, {
            encoding: "utf-8"
        });

        return res.render("capitulo/editar", { title:"Editar capítulo", historia, capitulo, arquivoTxt });
    },

    update: async (req, res) => {
        const { diretorio, txt } = req.params;
        const {
            titulo,
            texto,
            notasIniciais,
            notasFinais,
        } = req.body;
        
        const caminhoCompleto = 
            path.join("uploads", "historias", diretorio, `${txt}.txt`);

        fs.writeFileSync(caminhoCompleto, texto);

        await Capitulo.update({
            titulo,
            notasIniciais,
            notasFinais,
            updatedAt: new Date(),
        }, { 
            where: { texto: txt }, 
        }, {
            include: {
                model: Historia,
            },
        });

        return res.redirect(`/story/${diretorio}/chapters`);
    },

    destroy: async (req, res) => {

        if (req.session.authUsuario) {

            const sessaoUsuario = req.session.authUsuario.id;
            const { diretorio, txt } = req.params;

            await Historia.findOne({
                include: [{
                    model: Usuario,
                    through: Autor,
                    where: { id: sessaoUsuario },
                }],
                where: { diretorio }, 
            });

            await Capitulo.destroy({ 
                where: { texto: txt }, 
            });

            return res.redirect(`/story/${diretorio}/chapters`);

        } else if (req.session.authAdmin) {

            const { diretorio, txt } = req.params;

            await Historia.findOne({
                where: { diretorio },
            });

            await Capitulo.destroy({ 
                where: { texto: txt }, 
            });

            return res.redirect(`/admin/story/${diretorio}/chapters`);

        }
    },



    findByFile: async (req, res) => {
        const { diretorio, txt } = req.params;
        const historia = await Historia.findOne({
            where: { diretorio },
        });
        const capitulo = await Capitulo.findOne({
            where: { texto: txt },
        });
        const caminhoCompleto =
            path.join("uploads", "historias", diretorio, `${txt}.txt`);
        const arquivoTxt = fs.readFileSync(caminhoCompleto, {
            encoding: "utf-8"
        });
        return res.render("capitulo/ler", { title: "Capítulo", capitulo, historia, arquivoTxt });
    },

};

module.exports = capituloController;
