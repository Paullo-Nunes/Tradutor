import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createApp } from "../src/app.js";

let server;
let baseUrl;

before(async () => {
    server = createApp({ apiKey: "test-key" }).listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test("serve a interface e os recursos estáticos", async () => {
    const [page, stylesheet] = await Promise.all([
        fetch(baseUrl),
        fetch(`${baseUrl}/style.css`)
    ]);

    assert.equal(page.status, 200);
    assert.match(await page.text(), /Tradutor \| Tradução rápida/);
    assert.equal(stylesheet.status, 200);
});

test("expõe uma verificação de saúde sem revelar a chave", async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.deepEqual(await response.json(), { status: "ok" });
});

test("recusa idioma inválido antes de chamar o provedor", async () => {
    const response = await fetch(`${baseUrl}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Olá", targetLanguage: "xx" })
    });

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /idioma de destino/);
});

test("informa quando a chave do provedor não está configurada", async () => {
    const appWithoutKey = createApp({ apiKey: "" });
    const temporaryServer = appWithoutKey.listen(0);
    await new Promise((resolve) => temporaryServer.once("listening", resolve));

    try {
        const response = await fetch(`http://127.0.0.1:${temporaryServer.address().port}/api/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Olá", targetLanguage: "en" })
        });

        assert.equal(response.status, 503);
        assert.match((await response.json()).error, /não está configurado/);
    } finally {
        await new Promise((resolve) => temporaryServer.close(resolve));
    }
});
