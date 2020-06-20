const express = require("express");
const router = express.Router();

const authAdmin = require("../middlewares/authAdmin");

const generoController = require("../controllers/generoController");

router.get("/", authAdmin, generoController.index);
router.get("/new", authAdmin, generoController.create);
router.post("/new", authAdmin, generoController.store);
router.get("/edit/:id", authAdmin, generoController.edit);
router.put("/edit/:id", authAdmin, generoController.update);
router.delete("/delete/:id", authAdmin, generoController.destroy);

module.exports = router;
