const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const usuarioController = require("../controllers/usuarioController");
const historiaController = require("../controllers/historiaController");

const auth = require("../middlewares/auth");

router.get("/", authController.home);

router.get("/login", authController.create);
router.post("/login", authController.store);
router.get("/logout", authController.destroy);

router.get("/signup", usuarioController.create);
router.post("/signup", usuarioController.store);

router.get("/home", auth, authController.index);
router.get("/users", auth, usuarioController.index);
router.get("/stories", auth, historiaController.index);

module.exports = router;
