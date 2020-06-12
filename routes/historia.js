const express = require("express");
const router = express.Router();

const historiaController = require("../controllers/historiaController");
const capituloController = require("../controllers/capituloController");

//const capituloRouter = require("../routes/capitulo");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

router.get("/", auth, historiaController.index);
router.get("/new", auth, historiaController.create);
router.post("/new", auth, historiaController.store);
router.get("/edit/:id", auth, historiaController.edit);
router.put("/edit/:id", auth, upload.any(), historiaController.update);
router.delete("/delete/:id", auth, historiaController.destroy)
router.get("/:id", auth, historiaController.findById);

//router.use("/:id/chapters", auth, capituloController.index);
//router.use("/:id/chapter", capituloRouter, auth, capituloController.index);

router.get("/:id/chapters", auth, capituloController.index);
router.get("/:id/chapter", auth, capituloController.index);
router.get("/:id/chapter/new", auth, capituloController.create);
router.post("/:id/chapter/new", auth, capituloController.store);
//router.get("/:id/chapter/:id/edit", auth, capituloController.edit);
//router.put("/:id/chapter/:id/edit", auth, upload.any(), capituloController.update);
//router.delete("/:id/chapter/:id/delete", auth, capituloController.destroy);

module.exports = router;
