const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authVisitante = require("../middlewares/authVisitante");
const validacaoCadastro = require("../middlewares/validacaoCadastro");

const uploadAvatar = require("../config/uploadAvatar");

const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");
const newsletterController = require("../controllers/newsletterController");

router.get("/", authController.home);
router.get("/login", authController.create);
router.post("/login", authController.store);
router.get("/logout", auth, authController.destroy);
router.get("/home", auth, authController.index);
router.post("/newsletter", newsletterController.store);

router.get("/signup", usuarioController.create);
router.post("/signup", validacaoCadastro, usuarioController.store);

router.get("/settings", auth, usuarioController.edit); // separar página de alterar senha
router.put("/settings", auth, uploadAvatar.any(), usuarioController.update);
router.post("/settings/password", auth, usuarioController.updatePassword);
router.delete("/delete/:sessaoUsuario", auth, usuarioController.destroy);

router.get("/mystories", auth, historiaController.findStoriesByUser);

router.get("/users", auth, usuarioController.index); // tornar pública
router.get("/stories", auth, historiaController.index); // tornar pública

module.exports = router;
