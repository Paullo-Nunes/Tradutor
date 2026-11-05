import test from "node:test";
import assert from "node:assert/strict";
import { MAX_TEXT_LENGTH, validateTranslationInput } from "../src/translation.js";

test("aceita texto e idioma suportado", () => {
    assert.equal(validateTranslationInput({ text: "Bom dia", targetLanguage: "en" }), null);
});

test("rejeita texto vazio", () => {
    assert.equal(validateTranslationInput({ text: "  ", targetLanguage: "en" }), "Digite um texto para traduzir.");
});

test("rejeita texto acima do limite", () => {
    const error = validateTranslationInput({
        text: "a".repeat(MAX_TEXT_LENGTH + 1),
        targetLanguage: "en"
    });
    assert.match(error, /no máximo/);
});

test("rejeita idioma que não está na lista permitida", () => {
    assert.match(
        validateTranslationInput({ text: "Olá", targetLanguage: "xx" }),
        /idioma de destino/
    );
});
