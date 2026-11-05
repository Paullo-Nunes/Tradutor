import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MAX_TEXT_LENGTH, TranslationError, translateText, validateTranslationInput } from "./translation.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(currentDirectory, "..");

export function createApp({ apiKey = process.env.GOOGLE_TRANSLATE_API_KEY } = {}) {
    const app = express();

    app.disable("x-powered-by");
    app.use(helmet());
    app.use(express.json({ limit: "20kb" }));
    app.use(express.static(path.join(projectDirectory, "public")));
    app.use("/assets", express.static(path.join(projectDirectory, "assets")));

    app.get("/api/health", (_request, response) => {
        response.json({ status: "ok" });
    });

    app.post("/api/translate", rateLimit({
        windowMs: 60 * 1000,
        limit: 20,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        handler: (_request, response) => {
            response.status(429).json({ error: "Muitas solicitações. Aguarde um minuto e tente novamente." });
        }
    }), async (request, response, next) => {
        const validationError = validateTranslationInput(request.body);
        if (validationError) {
            response.status(400).json({ error: validationError });
            return;
        }

        try {
            const text = request.body.text.trim();
            if (text.length > MAX_TEXT_LENGTH) {
                response.status(400).json({ error: `O texto deve ter no máximo ${MAX_TEXT_LENGTH} caracteres.` });
                return;
            }
            const translation = await translateText(text, request.body.targetLanguage, apiKey);
            response.json({ translation });
        } catch (error) {
            next(error);
        }
    });

    app.use("/api", (_request, response) => {
        response.status(404).json({ error: "Rota da API não encontrada." });
    });

    app.use((error, _request, response, _next) => {
        if (error instanceof SyntaxError && "body" in error) {
            response.status(400).json({ error: "O corpo da solicitação não contém JSON válido." });
            return;
        }
        if (error?.type === "entity.too.large") {
            response.status(413).json({ error: "A solicitação excede o tamanho permitido." });
            return;
        }

        if (error instanceof TranslationError) {
            response.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.error("Unexpected request error:", error);
        response.status(500).json({ error: "Erro interno. Tente novamente mais tarde." });
    });

    return app;
}
