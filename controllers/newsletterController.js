const { Newsletter } = require("../models");

const newsletterController = {

    store: async (req, res) => {
        const { email, nome } = req.body;
        try {
            const newsletter = await Newsletter.create({
                email,
                nome,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return res.status(201).json(newsletter);
        } catch (error) {
            return res.status(400).json({
                error: true,
                msg: "Erro na requisição. Tente novamente!",
            });
        }
    },

};

module.exports = newsletterController;
