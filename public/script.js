const form = document.querySelector("#form-traducao");
const inputTexto = document.querySelector("#input-texto");
const idioma = document.querySelector("#idioma");
const traducaoTexto = document.querySelector("#traducao");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const botaoTraduzir = document.querySelector("#btn-traduzir");
const botaoVoz = document.querySelector("#btn-voz");
const botaoCopiar = document.querySelector("#btn-copiar");

inputTexto.addEventListener("input", () => {
    contador.textContent = `${inputTexto.value.length} / 5000`;
});

form.addEventListener("submit", traduzir);
botaoVoz.addEventListener("click", ouvirVoz);
botaoCopiar.addEventListener("click", copiarTraducao);

async function traduzir(event) {
    event.preventDefault();
    const texto = inputTexto.value.trim();

    mensagem.textContent = "";
    mensagem.classList.remove("sucesso");
    if (!texto) {
        mensagem.textContent = "Digite um texto para traduzir.";
        inputTexto.focus();
        return;
    }

    botaoTraduzir.disabled = true;
    botaoTraduzir.querySelector("span").textContent = "Traduzindo...";
    traducaoTexto.textContent = "";
    botaoCopiar.disabled = true;

    try {
        const resposta = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: texto, targetLanguage: idioma.value })
        });
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.error || "Não foi possível traduzir o texto.");
        }

        traducaoTexto.textContent = dados.translation;
        botaoCopiar.disabled = false;
    } catch (erro) {
        mensagem.textContent = erro instanceof Error
            ? erro.message
            : "Falha de comunicação. Verifique sua conexão e tente novamente.";
    } finally {
        botaoTraduzir.disabled = false;
        botaoTraduzir.querySelector("span").textContent = "Traduzir";
    }
}

async function copiarTraducao() {
    try {
        await navigator.clipboard.writeText(traducaoTexto.textContent);
        mensagem.textContent = "Tradução copiada.";
        mensagem.classList.add("sucesso");
    } catch {
        mensagem.textContent = "Não foi possível copiar. Selecione e copie o texto manualmente.";
        mensagem.classList.remove("sucesso");
    }
}

function ouvirVoz() {
    mensagem.classList.remove("sucesso");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        mensagem.textContent = "Ditado por voz não é compatível com este navegador.";
        return;
    }

    const reconhecimento = new SpeechRecognition();
    reconhecimento.lang = "pt-BR";
    reconhecimento.onresult = (event) => {
        inputTexto.value = event.results[0][0].transcript;
        inputTexto.dispatchEvent(new Event("input"));
        form.requestSubmit();
    };
    reconhecimento.onerror = () => {
        mensagem.textContent = "Não foi possível reconhecer a voz. Verifique a permissão do microfone.";
    };
    reconhecimento.start();
}
