const express = require("express");
const router = express.Router();

const classificacaoController = require("../controllers/classificacaoController");

const auth = require("../middlewares/auth");

router.get("/", auth, classificacaoController.index);
router.get("/new", auth, classificacaoController.create);
router.post("/new", auth, classificacaoController.store);
router.get("/edit/:id", auth, classificacaoController.edit);
router.put("/edit/:id", auth, classificacaoController.update);
router.delete("/delete/:id", auth, classificacaoController.destroy);

module.exports = router;
