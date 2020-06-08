const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

const auth = require("../middlewares/auth");

router.get("/new", auth, categoriaController.create);
router.post("/new", auth, categoriaController.store);
router.get("/edit/:id", auth, categoriaController.edit);
router.put("/edit/:id", auth, categoriaController.update);
router.delete("/delete/:id", auth, categoriaController.destroy);

module.exports = router;
