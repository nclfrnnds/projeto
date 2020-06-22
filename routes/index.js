const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");

router.get("/", authController.home);
router.get("/login", authController.create);
router.post("/login", authController.store);
router.get("/logout", auth, authController.destroy);
router.get("/home", auth, authController.index);

router.get("/signup", usuarioController.create);
router.post("/signup", usuarioController.store);

router.get("/settings", auth, usuarioController.edit); // separar página de alterar senha
router.put("/settings", auth, upload.any(), usuarioController.update);
router.delete("/delete/:sessaoUsuario", auth, usuarioController.destroy);

router.get("/users", auth, usuarioController.index); // tornar pública
router.get("/stories", auth, historiaController.index); // tornar pública

module.exports = router;
