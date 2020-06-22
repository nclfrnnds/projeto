const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");

const usuarioController = require("../controllers/usuarioController");

router.get("/", auth, usuarioController.index); // tornar pública
router.get("/:nomeUsuario", auth, usuarioController.findByUsername); // tornar pública

module.exports = router;
