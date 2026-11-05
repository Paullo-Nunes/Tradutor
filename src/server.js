import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 3000);
const app = createApp();

if (!process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY === "cole_sua_chave_aqui") {
    console.error("Configure GOOGLE_TRANSLATE_API_KEY no arquivo .env antes de iniciar o servidor.");
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Tradutor disponível em http://localhost:${port}`);
});
