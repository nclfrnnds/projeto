const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const uploadAvatar = require("../config/uploadAvatar");

const usuarioController = require("../controllers/usuarioController");

router.get("/", authAdmin, usuarioController.index); // tornar pública em usuário.js e apagar aqui
router.get("/:nomeUsuario", authAdmin, usuarioController.findByUsername); // tornar pública em usuário.js e apagar aqui

//router.get("/edit/:id", authAdmin, usuarioController.edit);
//router.put("/edit/:id", authAdmin, uploadAvatar.any(), usuarioController.update);
router.delete("/delete/:id", authAdmin, usuarioController.destroy);

module.exports = router;
