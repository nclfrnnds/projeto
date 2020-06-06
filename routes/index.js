const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");
const capituloController = require("../controllers/capituloController");
const autorController = require("../controllers/autorController");
const generoController = require("../controllers/generoController");
const categoriaController = require("../controllers/categoriaController");
const classificacaoController = require("../controllers/classificacaoController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

router.get("/", authController.index);
router.get("/home", auth, authController.home);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/signup", usuarioController.create);
router.post("/signup", usuarioController.store);

module.exports = router;
