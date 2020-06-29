// ASSINAR NEWSLETTER

const emailNews = document.getElementById("emailNews");
const nomeNews = document.getElementById("nomeNews");
const btnAssinar = document.querySelector(".btnAssinar");
const listaAlertaNews = document.querySelector(".listaAlertaNews");

btnAssinar.addEventListener("click", async function assinarNewsletter(event) {
    event.preventDefault();
    if (emailNews.value === "") {
        return listaAlertaNews.innerHTML = "<p>Insira o e-mail!</p>";
    } else {
        const resposta = await fetch("/newsletter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailNews.value,
                nome: nomeNews.value,
            }),
        });
        if (resposta.status == 201) {
            listaAlertaNews.value = "";
            emailNews.value = "";
            nomeNews.value = "";
            return listaAlertaNews.innerHTML = "<p>E-mail cadastrado com sucesso!</p>";
        } else {
            listaAlertaNews.value = "";
            emailNews.value = "";
            nomeNews.value = "";
            return listaAlertaNews.innerHTML = "<p>Erro no cadastro! Tente novamente</p>";
        }
    }
});

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
