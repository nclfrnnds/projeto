const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const upload = require("../config/upload");

const historiaController = require("../controllers/historiaController");
const capituloRouter = require("../routes/capitulo");

router.get("/", auth, historiaController.index); // tornar pública
router.get("/new", auth, historiaController.create);
router.post("/new", auth, historiaController.store);
router.get("/:id/edit", auth, historiaController.edit);
router.put("/:id/edit", auth, upload.any(), historiaController.update); 
router.delete("/:id/delete", auth, historiaController.destroy);
router.get("/:id", auth, historiaController.findById); // tornar pública

router.use("/", capituloRouter);

module.exports = router;
