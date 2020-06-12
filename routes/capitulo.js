const express = require("express");
const router = express.Router();

const capituloController = require("../controllers/capituloController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

//router.get("/new", auth, capituloController.create);
//router.post("/new", auth, capituloController.store);
//router.get("/:id/edit", auth, capituloController.edit);
//router.put("/:id/edit", auth, upload.any(), capituloController.update);
//router.delete("/:id/delete", auth, capituloController.destroy);

module.exports = router;
