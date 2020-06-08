const express = require("express");
const router = express.Router();

const generoController = require("../controllers/generoController");

const auth = require("../middlewares/auth");

router.get("/new", auth, generoController.create);
router.post("/new", auth, generoController.store);
router.get("/edit/:id", auth, generoController.edit);
router.put("/edit/:id", auth, generoController.update);
router.delete("/delete/:id", auth, generoController.destroy);

module.exports = router;
