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
    //endereço do servidor com o texto que quero traduzir
    let endereco = "https://api.mymemory.translated.net/get?q=" + inputTexto.value + "&langpair=pt-BR|" + idioma.value //pegando o valor do idioma
    //resposta do servidor
    let resposta = await fetch(endereco)
    //conversão da resposta para JSON
    let dados = await resposta.json() //convertendo a resposta em formato json

    traducaoTexto.textContent = dados.responseData.translatedText  //pegando o texto traduzido e mostrando na tela

}

function ouvirVoz() {

    let speech = window.webkitSpeechRecognition //Ferramenta de transcrição de áudio

    let reconhecimentoVoz = new speech() //Deixando ela pronta para uso

    //configurando a ferramenta
    reconhecimentoVoz.lang = "pt-BR"

    //Avise-me quando terminar de transcrever a voz
    reconhecimentoVoz.onresult = (event) => {
        console.log(event)

    }

    reconhecimentoVoz.start()
}
