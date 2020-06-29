//const genero = document.getElementById("genero");

/*genero.onChange = function () {
    console.log(this.value);
};*/

/*nomeUsuario.addEventListener("focus", function () {
    this.style.backgroundColor = "#EEE";
    //console.log("Entrou no campo nome de usuário!");
});

nomeUsuario.addEventListener("blur", function () {
    this.style.backgroundColor = "#FFF";
    //console.log("Saiu do campo nome de usuário!");
});

nomeUsuario.addEventListener("keyup", function () {
    if(this.nodeValue.length >= 3) {
        //console.log("Tamanho ok");
    }
});*/

function campoVazio(campo) {
    return campo.value.trim() === "";
}

function campoNaoPreenchido(campo) {
    return listaDeErros.innerHTML += "<li>Campo <b>" + campo + "</b> não preenchido</li>";
}

const formCadastrarUsuario = document.querySelector(".formCadastrarUsuario");
const nomeUsuario = document.getElementById("nomeUsuario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");

const listaDeErros = document.querySelector(".listaDeErros");

formCadastrarUsuario.addEventListener("submit", function(event) {
    
    listaDeErros.innerHTML = "";

    if (campoVazio(nomeUsuario)) {
        campoNaoPreenchido("nome de usuário");
    };

    if (campoVazio(email)) {
        campoNaoPreenchido("e-mail");
    };

    if (campoVazio(senha)) {
        campoNaoPreenchido("senha");
    };

    if (listaDeErros.querySelectorAll("li").length > 0) {
        event.preventDefault();
        listaDeErros.hidden = "";
    };

});
