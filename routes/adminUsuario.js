const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const upload = require("../config/upload");

const usuarioController = require("../controllers/usuarioController");

router.get("/", authAdmin, usuarioController.index);
router.get("/edit/:id", authAdmin, usuarioController.edit);
router.put("/edit/:id", authAdmin, upload.any(), usuarioController.update);
router.delete("/delete/:id", authAdmin, usuarioController.destroy);

module.exports = router;
