const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const capituloController = require("../controllers/capituloController");

router.get("/:diretorio/chapters", authAdmin, capituloController.index); // tornar pública em capitulo.js e apagar aqui
router.get("/:diretorio/chapter", authAdmin, capituloController.index); // tornar pública em capitulo.js e apagar aqui

router.delete("/:diretorio/chapter/:arquivo/delete", authAdmin, capituloController.destroy);

router.get("/:diretorio/chapter/:arquivo", authAdmin, capituloController.findByFile); // tornar pública em capitulo.js e apagar aqui

module.exports = router;
