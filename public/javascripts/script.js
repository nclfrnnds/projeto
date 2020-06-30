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
