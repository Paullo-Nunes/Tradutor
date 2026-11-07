# Tradutor

Aplicação web simples para traduzir textos do português para diversos idiomas, com suporte opcional à entrada por voz usando a API de reconhecimento de fala do navegador.

## Visão geral

Este projeto é uma interface front-end em JavaScript puro que conecta com a API pública MyMemory Translation para realizar traduções em tempo real. A aplicação permite:

- digitar um texto para tradução;
- escolher o idioma de destino;
- visualizar a tradução imediatamente;
- usar o microfone para ditar o texto e traduzir automaticamente.

## Funcionalidades

- Tradução de texto em tempo real
- Seleção de idioma entre inglês, espanhol, francês, alemão, italiano e japonês
- Entrada por voz com SpeechRecognition
- Interface responsiva e visual moderna
- Sem dependências externas de build ou framework

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- API de tradução: MyMemory Translation API
- Web Speech API para reconhecimento de voz

## Estrutura do projeto

```text
Tradutor/
├── assets/
│   └── img/
│       ├── mapa.jpg
│       ├── microfone.svg
│       └── traduzir.svg
├── index.html
├── script.js
├── style.css
└── README.md
```

## Como executar

Como o projeto é estático, basta abrir o arquivo `index.html` em um navegador ou, preferencialmente, servir a pasta localmente.

### Opção 1: usando um servidor local

No terminal, dentro da pasta do projeto, execute:

```bash
python -m http.server 8000
```

Depois abra no navegador:

```text
http://localhost:8000
```

### Opção 2: abrir diretamente no navegador

Você também pode abrir o arquivo `index.html` diretamente, mas algumas funcionalidades como reconhecimento de voz podem exigir um ambiente mais seguro (por exemplo, `localhost` ou HTTPS).

## Como usar

1. Digite o texto na área principal.
2. Escolha o idioma de destino no seletor.
3. Clique no botão de tradução.
4. A tradução será exibida na seção "Tradução".
5. Para usar voz, clique no botão do microfone e fale.

## Observações importantes

- A tradução usa a API pública do MyMemory; por isso o funcionamento depende da disponibilidade da API e da conexão com a internet.
- O reconhecimento de voz funciona apenas em navegadores compatíveis com a Web Speech API.
- Em alguns navegadores, é necessário permitir acesso ao microfone.

## Personalização

Você pode alterar facilmente:

- os idiomas disponíveis no seletor em `index.html`;
- o estilo visual em `style.css`;
- a lógica da tradução e do reconhecimento de voz em `script.js`.

## Licença

Este projeto foi desenvolvido como exemplo didático e pode ser usado livremente para fins educativos ou pessoais.
