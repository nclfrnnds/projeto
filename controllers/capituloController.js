const { Capitulo } = require("../models");

const capituloController = {

    index: (req, res) => {
        return res.render("capitulos", { title: "Capítulos" });
    },

};

module.exports = capituloController;
