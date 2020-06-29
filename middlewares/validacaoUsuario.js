const { Usuario } = require("../models");
const { check, validationResult, body } = require("express-validator");

const validacaoUsuario = [
check("nomeUsuario").isLength({min: 3}).withMessage("O nome de usuário é muito curto"),
check("email").isEmail().withMessage("O e-mail não é válido"),
check("senha").isLength({min: 3}).withMessage("A senha é muito curta"),

body("nomeUsuario").custom(async nomeUsuario => {
    const usuario = await Usuario.findAll({
        where: { nomeUsuario },
    });
    let array = [];
    usuario.forEach(usuario => {
        array.push(usuario.nomeUsuario);
    });
    if (array.includes(nomeUsuario)) {
        return Promise.reject("O nome de usuário já está cadastrado no sistema");
    }

}),

body("email").custom(async email => {
    const usuario = await Usuario.findAll({
        where: { email },
    });
    let array = [];
    usuario.forEach(usuario => {
        array.push(usuario.email);
    });
    if (array.includes(email)) {
        return Promise.reject("O e-mail já está cadastrado no sistema");
    }

}),

check("nome"),
check("avatar"),
check("descricao"),
check("dataNascimento"),
check("genero"),
check("localizacao"),

];

module.exports = validacaoUsuario;