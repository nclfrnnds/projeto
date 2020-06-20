const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const categoriaController = require("../controllers/categoriaController");

router.get("/", authAdmin, categoriaController.index);
router.get("/new", authAdmin, categoriaController.create);
router.post("/new", authAdmin, categoriaController.store);
router.get("/edit/:id", authAdmin, categoriaController.edit);
router.put("/edit/:id", authAdmin, categoriaController.update);
router.delete("/delete/:id", authAdmin, categoriaController.destroy);

module.exports = router;
