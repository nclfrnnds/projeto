function campoVazio(campo) {
    return campo.value.trim() === "";
}

function campoNaoPreenchido(campo) {
    return listaDeErros.innerHTML += "<li>Campo <b>" + campo + "</b> não preenchido</li>";
}

const formUsuario = document.querySelector(".formEditarUsuario");

const nomeUsuario = document.getElementById("nomeUsuario");
const email = document.getElementById("email");
const nome = document.getElementById("nome");
const avatar = document.getElementById("avatar");
const descricao = document.getElementById("descricao");
const dataNascimento = document.getElementById("dataNascimento");
const genero = document.getElementById("genero");
const localizacao = document.getElementById("localizacao");

const listaDeErros = document.querySelector(".listaDeErros");

formUsuario.addEventListener("submit", function (event) {

    listaDeErros.innerHTML = "";

    if (campoVazio(nomeUsuario)) {
        campoNaoPreenchido("nome de usuário");
    };

    if (campoVazio(email)) {
        campoNaoPreenchido("e-mail");
    };

    if (listaDeErros.querySelectorAll("li").length > 0) {
        event.preventDefault();
        listaDeErros.hidden = "";
    };

});
