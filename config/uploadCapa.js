const multer = require("multer");
const path = require("path");

const storageCapa = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("public", "images", "uploads", "historias", "capas"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadCapa = multer({ storage: storageCapa });

module.exports = uploadCapa;
