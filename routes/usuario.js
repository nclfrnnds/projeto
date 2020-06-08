const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

router.get("/", usuarioController.index);
router.get("/:nomeUsuario", auth, usuarioController.findByUsername);
router.get("/edit/:id", auth, usuarioController.edit);
router.put("/edit/:id", auth, usuarioController.update);

module.exports = router;
