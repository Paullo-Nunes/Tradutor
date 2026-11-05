/* Primeiro passo:
[x] Saber quando o botão for clicado;
[x] Pegar o texto que o usuário digitou;
[x] Mandar para o servidor traduzir;
[x] Receber a resposta do servidor (tradução); 
[x] Colocar o texto na tela;
[x] Escolher o idioma.

   Segundo passo:
   [] Saber quando o botão do microfone for clicado;
   [] IA - detectar a voz e pegar a transcrição;
   [] Traduzir o que foi falado.

Endereço da API de Tradução mymemory traslation

https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it

Padrão: https://api.mymemory.translated.net/get?q=

Traduzir: Hello World!

Idioma de|para: &langpair=en|it    "obs.:colocar pt-BR|en depois do sinal ="

Conexão com servidor:

Fetch -> ferramenta do javascript para entrar em contato com um servidor

*/

let inputTexto = document.querySelector("#input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idioma = document.querySelector("#idioma")

async function traduzir() {

    const texto = inputTexto.value.trim();

    if (!texto) {
        traducaoTexto.textContent = "Por favor, digite um texto para traduzir.";
        return;
    }

    //endereço do servidor com o texto que quero traduzir
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt-BR|${encodeURIComponent(idioma.value)}`;//pegando o valor do idioma

    //resposta do servidor
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await resposta.json() //convertendo a resposta em formato json

        const textoTraduzido = dados?.responseData?.translatedText || "Erro ao obter a tradução."; //pegando o texto traduzido
        traducaoTexto.textContent = textoTraduzido;  //pegando o texto traduzido e mostrando na tela
    } catch (erro) {
        
        traducaoTexto.textContent = "Ocorreu um erro ao tentar traduzir o texto. tente novamente.";
    }


}

function ouvirVoz() {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta a API de reconhecimento de voz. Por favor, use um navegador compatível.");
        return;
    }

    const reconhecimentoVoz = new SpeechRecognition();
    reconhecimentoVoz.lang = "pt-BR";

    reconhecimentoVoz.onresult = (event) => {
        const textoTranscricao = event.results[0][0].transcript;
        inputTexto.value = textoTranscricao;
        traduzir();
    };

    reconhecimentoVoz.onerror = (event) => {
        alert("Ocorreu um erro no reconhecimento de voz: " + event.error);
    }

    reconhecimentoVoz.start();
}

        

 
