const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const upload = require("../config/upload");

const historiaController = require("../controllers/historiaController");
const capituloRouter = require("../routes/capitulo");

router.get("/", authAdmin, historiaController.index);
router.get("/:id/edit", authAdmin, historiaController.edit); // ADMIN NÃO PODE EDITAR
router.put("/:id/edit", authAdmin, upload.any(), historiaController.update); // ADMIN NÃO PODE EDITAR
router.delete("/:id/delete", authAdmin, historiaController.destroy); // ADMIN PODE EXCLUIR

router.use("/", capituloRouter);

module.exports = router;
