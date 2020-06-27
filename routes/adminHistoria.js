const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const historiaController = require("../controllers/historiaController");
const capituloRouter = require("../routes/capitulo");

router.get("/", authAdmin, historiaController.index); // tornar pública em historia.js e apagar aqui

router.delete("/:diretorio/delete", authAdmin, historiaController.destroy);

router.get("/:diretorio", authAdmin, historiaController.findByDirectory); // tornar pública em historia.js e apagar aqui

router.use("/", capituloRouter);

module.exports = router;
