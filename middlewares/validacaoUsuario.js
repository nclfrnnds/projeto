const { check, validationResult, body } = require("express-validator");

const validacaoUsuario = [

check("nomeUsuario"),
check("email"),
check("senha"),
check("nome"),
check("avatar"),
check("descricao"),
check("dataNascimento"),
check("genero"),
check("localizacao"),

];

module.exports = validacaoUsuario;