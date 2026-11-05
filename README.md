# Tradutor

Aplicação de tradução com front-end estático e backend Node.js/Express. O backend usa Google Cloud Translation Basic (API v2); a chave nunca é enviada ao navegador.

## Requisitos

- Node.js 20 ou superior
- Projeto no Google Cloud com faturamento configurado e a API Cloud Translation habilitada
- Chave de API restrita à Cloud Translation API (e, quando possível, às origens/IPs apropriados)

## Configuração

1. No Google Cloud Console, habilite a **Cloud Translation API** e crie uma chave de API. Configure restrições para que a chave só possa chamar essa API.
2. Instale as dependências:

   ```sh
   npm install
   ```

3. Crie o arquivo local de configuração copiando `.env.example` para `.env` e substitua `cole_sua_chave_aqui` pela sua chave:

   ```env
   PORT=3000
   GOOGLE_TRANSLATE_API_KEY=sua_chave
   ```

4. Inicie o servidor:

   ```sh
   npm start
   ```

5. Acesse <http://localhost:3000>. Não abra `index.html` diretamente: a página precisa do backend.

Em desenvolvimento, `npm run dev` reinicia o servidor quando os arquivos Node.js mudam. Execute os testes com `npm test`.

## API local

`POST /api/translate`

```json
{
  "text": "Bom dia",
  "targetLanguage": "en"
}
```

Idiomas aceitos: `en`, `es`, `fr`, `de`, `it`, `ja`, `ko`, `zh-CN` e `pt`. O texto de origem é português e o limite é 5.000 caracteres.

## Segurança e operação

- A chave é lida do ambiente no servidor; nunca a coloque no JavaScript ou no HTML.
- O servidor valida os campos e os idiomas, limita o tamanho das solicitações e aplica limite de 20 traduções por minuto e por IP.
- As respostas da API externa têm timeout. Erros do provedor não são repassados ao navegador com detalhes internos.
- Configure alertas e limites de orçamento no Google Cloud. Restrições de chave ajudam a reduzir abuso, mas não substituem controles de faturamento.
