export const MAX_TEXT_LENGTH = 5000;

export const SUPPORTED_LANGUAGES = new Set([
    "en",
    "es",
    "fr",
    "de",
    "it",
    "ja",
    "ko",
    "zh-CN",
    "pt"
]);

export class TranslationError extends Error {
    constructor(message, statusCode = 502) {
        super(message);
        this.name = "TranslationError";
        this.statusCode = statusCode;
    }
}

export function validateTranslationInput(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return "Envie um objeto com o texto e o idioma de destino.";
    }

    if (typeof body.text !== "string" || !body.text.trim()) {
        return "Digite um texto para traduzir.";
    }

    if (body.text.length > MAX_TEXT_LENGTH) {
        return `O texto deve ter no máximo ${MAX_TEXT_LENGTH} caracteres.`;
    }

    if (typeof body.targetLanguage !== "string" || !SUPPORTED_LANGUAGES.has(body.targetLanguage)) {
        return "O idioma de destino selecionado não é válido.";
    }

    return null;
}

export async function translateText(text, targetLanguage, apiKey) {
    if (!apiKey) {
        throw new TranslationError("O serviço de tradução não está configurado no servidor.", 503);
    }

    const endpoint = new URL("https://translation.googleapis.com/language/translate/v2");

    let response;
    try {
        response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey
            },
            body: JSON.stringify({ q: text, source: "pt", target: targetLanguage, format: "text" }),
            signal: AbortSignal.timeout(10000)
        });
    } catch (error) {
        if (error instanceof DOMException && error.name === "TimeoutError") {
            throw new TranslationError("O serviço de tradução demorou muito para responder. Tente novamente.", 504);
        }
        throw new TranslationError("Não foi possível conectar ao serviço de tradução.", 502);
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new TranslationError("O serviço de tradução retornou uma resposta inválida.", 502);
    }

    if (!response.ok) {
        console.error("Google Translation API request failed with status", response.status);
        throw new TranslationError("O serviço de tradução recusou a solicitação. Tente novamente mais tarde.", 502);
    }

    const translation = data?.data?.translations?.[0]?.translatedText;
    if (typeof translation !== "string") {
        throw new TranslationError("O serviço não retornou uma tradução válida.", 502);
    }

    return translation;
}
