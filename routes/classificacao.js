const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const classificacaoController = require("../controllers/classificacaoController");

router.get("/", authAdmin, classificacaoController.index);
router.get("/new", authAdmin, classificacaoController.create);
router.post("/new", authAdmin, classificacaoController.store);
router.get("/edit/:id", authAdmin, classificacaoController.edit);
router.put("/edit/:id", authAdmin, classificacaoController.update);
router.delete("/delete/:id", authAdmin, classificacaoController.destroy);

module.exports = router;
