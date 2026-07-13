import assert from "assert";
import { Lexer } from "../src/runtime/lexer/Lexer.js";

function tokenize(input) {
    const lexer = new Lexer(input);
    return lexer.tokenize();
}

describe("Lexer", () => {

    it("tokenizes identifiers", () => {
        const tokens = tokenize("hello world");
        assert.strictEqual(tokens[0].type, "IDENTIFIER");
        assert.strictEqual(tokens[0].value, "hello");
        assert.strictEqual(tokens[1].type, "IDENTIFIER");
        assert.strictEqual(tokens[1].value, "world");
    });

    it("tokenizes numbers", () => {
        const tokens = tokenize("42 7");
        assert.strictEqual(tokens[0].type, "NUMBER");
        assert.strictEqual(tokens[0].value, "42");
        assert.strictEqual(tokens[1].type, "NUMBER");
        assert.strictEqual(tokens[1].value, "7");
    });

    it("tokenizes strings", () => {
        const tokens = tokenize('"hello" "world"');
        assert.strictEqual(tokens[0].type, "STRING");
        assert.strictEqual(tokens[0].value, "hello");
        assert.strictEqual(tokens[1].type, "STRING");
        assert.strictEqual(tokens[1].value, "world");
    });

    it("tokenizes glyphs", () => {
        const tokens = tokenize("流 火");
        assert.strictEqual(tokens[0].type, "GLYPH");
        assert.strictEqual(tokens[1].type, "GLYPH");
    });

    it("tokenizes ritual blocks", () => {
        const tokens = tokenize("::begin x ::end");
        assert.strictEqual(tokens[0].type, "RITUAL_BEGIN");
        assert.strictEqual(tokens[1].type, "IDENTIFIER");
        assert.strictEqual(tokens[2].type, "RITUAL_END");
    });

    it("tokenizes seal blocks", () => {
        const tokens = tokenize("[!] x [/!]");
        assert.strictEqual(tokens[0].type, "SEAL_OPEN");
        assert.strictEqual(tokens[1].type, "IDENTIFIER");
        assert.strictEqual(tokens[2].type, "SEAL_CLOSE");
    });

    it("tokenizes elements", () => {
        const tokens = tokenize("flow flame dusk stone");
        assert.strictEqual(tokens[0].type, "FLOW");
        assert.strictEqual(tokens[1].type, "FLAME");
        assert.strictEqual(tokens[2].type, "DUSK");
        assert.strictEqual(tokens[3].type, "STONE");
    });

    it("produces EOF at end", () => {
        const tokens = tokenize("x");
        assert.strictEqual(tokens[tokens.length - 1].type, "EOF");
    });

});
