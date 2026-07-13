import assert from "assert";
import { Lexer } from "../src/runtime/lexer/Lexer.js";
import { Parser } from "../src/runtime/parser/Parser.js";
import { SemanticEngine } from "../src/runtime/semantic/SemanticEngine.js";
import { SealEngine } from "../src/runtime/seal/SealEngine.js";
import { SealError } from "../src/runtime/core/Errors.js";

function verify(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();

    const parser = new Parser(tokens);
    const ast = parser.parse();

    const semantic = new SemanticEngine(ast);
    semantic.analyze();

    const seal = new SealEngine(ast);
    return seal.verify();
}

describe("SealEngine", () => {

    it("accepts valid seals", () => {
        const result = verify("[!] x [/!]");
        assert.strictEqual(result, true);
    });

    it("rejects empty seals", () => {
        assert.throws(() => {
            verify("[!] [/!]");
        }, SealError);
    });

    it("rejects nested seals", () => {
        assert.throws(() => {
            verify("[!] [!] x [/!] [/!]");
        }, SealError);
    });

    it("rejects forbidden elements inside seals", () => {
        assert.throws(() => {
            verify("[!] flame x [/!]");
        }, SealError);
    });

    it("allows FLOW inside seals", () => {
        const result = verify("[!] flow x [/!]");
        assert.strictEqual(result, true);
    });

    it("allows DUSK inside seals", () => {
        const result = verify("[!] dusk x [/!]");
        assert.strictEqual(result, true);
    });

    it("allows STONE inside seals", () => {
        const result = verify("[!] stone x [/!]");
        assert.strictEqual(result, true);
    });

});
