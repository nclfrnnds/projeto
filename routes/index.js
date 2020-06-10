const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");
const capituloController = require("../controllers/capituloController");

const auth = require("../middlewares/auth");

router.get("/", authController.index);
router.get("/home", auth, authController.home);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/signup", usuarioController.create);
router.post("/signup", usuarioController.store);

router.get("/users", auth, usuarioController.index);
router.get("/stories", auth, historiaController.index);
router.get("/chapters", auth, capituloController.index);

module.exports = router;
