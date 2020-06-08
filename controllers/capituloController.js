const { Capitulo } = require("../models");

const capituloController = {

    index: (req, res) => {
        res.render("capitulos", { title: "Capítulos" });
    },

};

module.exports = capituloController;
