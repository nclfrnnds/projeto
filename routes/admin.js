const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const generoController = require("../controllers/generoController");
const categoriaController = require("../controllers/categoriaController");
const classificacaoController = require("../controllers/classificacaoController");

const generoRouter = require("../routes/genero");
const categoriaRouter = require("../routes/categoria");
const classificacaoRouter = require("../routes/classificacao");

const auth = require("../middlewares/auth");

router.get("/", authController.admin);

router.use("/genre", generoRouter);
router.use("/category", categoriaRouter);
router.use("/rating", classificacaoRouter);

router.get("/genres", auth, generoController.index);
router.get("/categories", auth, categoriaController.index);
router.get("/ratings", auth, classificacaoController.index);

module.exports = router;
