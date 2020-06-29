const { check, validationResult, body } = require("express-validator");

const validacaoHistoria = [

check("titulo"),
check("capa"),
check("sinopse"),
check("classificacao"),
check("finalizada"),

];

module.exports = validacaoHistoria;