/* Primeiro passo:
[] Saber quando o botão for clicado;
[] Pegar o texto que o usuário digitou;
[] Mandar para o servidor traduzir;
[] Receber a resposta do servidor (tradução); 
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

function traduzir() {
    

    let endereco = "https://api.mymemory.translated.net/get?q=" + inputTexto.value + "&langpair=pt-BR|en"


}
