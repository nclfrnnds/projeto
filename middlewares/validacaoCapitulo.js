const { check, validationResult, body } = require("express-validator");

const validacaoCapitulo = [

check("titulo"),
check("notasIniciais"),
check("notasFinais"),
check("texto"),

];

module.exports = validacaoCapitulo;