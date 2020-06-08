const express = require("express");
const router = express.Router();

const historiaController = require("../controllers/historiaController");

const auth = require("../middlewares/auth");
const upload = require("../config/upload");

module.exports = router;
