const express = require("express");
const router = express.Router();

const historiaController = require("../controllers/historiaController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

router.get("/", auth, historiaController.index);
router.get("/new", auth, historiaController.create);
router.post("/new", auth, historiaController.store);
router.get("/edit/:id", auth, historiaController.edit);
router.put("/edit/:id", auth, upload.any(), historiaController.update);
router.delete("/delete/:id", auth, historiaController.destroy)
router.get("/:id", auth, historiaController.findById);

module.exports = router;
