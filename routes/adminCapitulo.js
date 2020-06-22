const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const upload = require("../config/upload");

const capituloController = require("../controllers/capituloController");

router.get("/:id/chapters", authAdmin, capituloController.index);
router.get("/:id/chapter", authAdmin, capituloController.index);
router.get("/:id/chapter/:idChapter/edit", authAdmin, capituloController.edit); // ADMIN NÃO PODE EDITAR
router.put("/:id/chapter/:idChapter/edit", authAdmin, upload.any(), capituloController.update); // ADMIN NÃO PODE EDITAR
router.delete("/:id/chapter/:idChapter/delete", authAdmin, capituloController.destroy); // ADMIN PODE EXCLUIR

module.exports = router;
