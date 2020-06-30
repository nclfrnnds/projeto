const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const capituloController = require("../controllers/capituloController");

router.get("/:diretorio/chapters", auth, capituloController.index); // tornar pública
router.get("/:diretorio/chapter", auth, capituloController.index); // tornar pública
router.get("/:diretorio/chapter/new", auth, capituloController.create);
router.post("/:diretorio/chapter/new", auth, capituloController.store);
router.get("/:diretorio/chapter/:txt/edit", auth, capituloController.edit);
router.put("/:diretorio/chapter/:txt/edit", auth, capituloController.update);
router.delete("/:diretorio/chapter/:txt/delete", auth, capituloController.destroy); // admin pode excluir
router.get("/:diretorio/chapter/:txt", auth, capituloController.findByFile); // tornar pública

module.exports = router;
