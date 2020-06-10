const express = require("express");
const router = express.Router();

const capituloController = require("../controllers/capituloController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");



module.exports = router;
