/* Primeiro passo:
[x] Saber quando o botão for clicado;
[x] Pegar o texto que o usuário digitou;
[x] Mandar para o servidor traduzir;
[x] Receber a resposta do servidor (tradução); 
[] Colocar o texto na tela.

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

async function traduzir() {
    //endereço do servidor com o texto que quero traduzir
    let endereco = "https://api.mymemory.translated.net/get?q=" + inputTexto.value + "&langpair=pt-BR|en"
    //resposta do servidor
    let resposta = await fetch(endereco)
    //conversão da resposta para JSON
    let dados = await resposta.json() //convertendo a resposta em formato json

    traducaoTexto.textContent = dados.responseData.translatedText  //pegando o texto traduzido e mostrando na tela

    console.log(dados)

}
