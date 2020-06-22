const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const adminController = require("../controllers/adminController");

const generoController = require("../controllers/generoController");
const categoriaController = require("../controllers/categoriaController");
const classificacaoController = require("../controllers/classificacaoController");

const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");
const capituloController = require("../controllers/capituloController");

const generoRouter = require("../routes/genero");
const categoriaRouter = require("../routes/categoria");
const classificacaoRouter = require("../routes/classificacao");

const adminUsuarioRouter = require("../routes/adminUsuario");
const adminHistoriaRouter = require("../routes/adminHistoria");
const adminCapituloRouter = require("../routes/adminCapitulo");

router.get("/", adminController.create);
router.post("/", adminController.store);
router.get("/logout", authAdmin, adminController.destroy);
router.get("/painel", authAdmin, adminController.index);

router.get("/genres", authAdmin, generoController.index);
router.get("/categories", authAdmin, categoriaController.index);
router.get("/ratings", authAdmin, classificacaoController.index);

router.use("/genre", generoRouter);
router.use("/category", categoriaRouter);
router.use("/rating", classificacaoRouter);

router.get("/users", authAdmin, usuarioController.index);
router.get("/stories", authAdmin, historiaController.index);
router.get("/chapters", authAdmin, capituloController.index);

router.use("/user", adminUsuarioRouter);
router.use("/story", adminHistoriaRouter);
router.use("/chapter", adminCapituloRouter);

module.exports = router;
