const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

const usuarioController = require("../controllers/usuarioController");

router.get("/", auth, usuarioController.index);
router.get("/edit/:id", auth, usuarioController.edit);
router.put("/edit/:id", auth, upload.any(), usuarioController.update); //settings
router.delete("/delete/:id", auth, usuarioController.destroy);
router.get("/:nomeUsuario", auth, usuarioController.findByUsername);

module.exports = router;
