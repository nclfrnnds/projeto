const { Historia } = require("../models");

const historiaController = {

    index: (req, res) => {
        res.render("historias", { title: "Histórias" });
    },

};

module.exports = historiaController;
