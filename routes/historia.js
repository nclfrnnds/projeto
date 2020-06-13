const express = require("express");
const router = express.Router();

const historiaController = require("../controllers/historiaController");
const capituloRouter = require("../routes/capitulo");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

router.get("/", auth, historiaController.index);
router.get("/new", auth, historiaController.create);
router.post("/new", auth, historiaController.store);
router.get("/:id/edit", auth, historiaController.edit);
router.put("/:id/edit", auth, upload.any(), historiaController.update);
router.delete("/:id/delete", auth, historiaController.destroy)
router.get("/:id", auth, historiaController.findById);

router.use("/", capituloRouter);

module.exports = router;
