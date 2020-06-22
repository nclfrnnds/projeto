const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const upload = require("../config/upload");

const capituloController = require("../controllers/capituloController");

router.get("/:id/chapters", auth, capituloController.index); // tornar pública
router.get("/:id/chapter", auth, capituloController.index); // tornar pública
router.get("/:id/chapter/new", auth, capituloController.create);
router.post("/:id/chapter/new", auth, capituloController.store);
router.get("/:id/chapter/:idChapter/edit", auth, capituloController.edit);
router.put("/:id/chapter/:idChapter/edit", auth, upload.any(), capituloController.update);
router.delete("/:id/chapter/:idChapter/delete", auth, capituloController.destroy);
router.get("/:id/chapter/:idChapter", auth, capituloController.findById); // tornar pública

module.exports = router;
