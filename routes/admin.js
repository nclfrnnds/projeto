const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const authAdminController = require("../controllers/authAdminController");
const generoController = require("../controllers/generoController");
const categoriaController = require("../controllers/categoriaController");
const classificacaoController = require("../controllers/classificacaoController");

const generoRouter = require("../routes/genero");
const categoriaRouter = require("../routes/categoria");
const classificacaoRouter = require("../routes/classificacao");

router.get("/", authAdminController.create);
router.post("/", authAdminController.store);
router.get("/logout", authAdminController.destroy);
router.get("/painel", authAdmin, authAdminController.index);

router.get("/genres", authAdmin, generoController.index);
router.get("/categories", authAdmin, categoriaController.index);
router.get("/ratings", authAdmin, classificacaoController.index);

router.use("/genre", generoRouter);
router.use("/category", categoriaRouter);
router.use("/rating", classificacaoRouter);

module.exports = router;
