const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const uploadCapa = require("../config/uploadCapa");

const historiaController = require("../controllers/historiaController");
const capituloRouter = require("../routes/capitulo");

router.get("/", auth, historiaController.index); // tornar pública
router.get("/new", auth, historiaController.create);
router.post("/new", auth, historiaController.store);
router.get("/:diretorio/edit", auth, historiaController.edit);
router.put("/:diretorio/edit", auth, uploadCapa.any(), historiaController.update); 
router.delete("/:diretorio/delete", auth, historiaController.destroy);
router.get("/:diretorio", auth, historiaController.findByDirectory); // tornar pública

router.use("/", capituloRouter);

module.exports = router;
