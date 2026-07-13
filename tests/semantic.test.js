import assert from "assert";
import { Lexer } from "../src/runtime/lexer/Lexer.js";
import { Parser } from "../src/runtime/parser/Parser.js";
import { SemanticEngine } from "../src/runtime/semantic/SemanticEngine.js";
import { SemanticError } from "../src/runtime/core/Errors.js";

function analyze(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const semantic = new SemanticEngine(ast);
    return semantic.analyze();
}

describe("SemanticEngine", () => {

    it("validates identifiers", () => {
        const ast = analyze("hello");
        assert.strictEqual(ast[0].type, "IDENTIFIER");
    });

    it("validates literals", () => {
        const ast = analyze("42");
        assert.strictEqual(ast[0].type, "LITERAL");
    });

    it("validates elements", () => {
        const ast = analyze("flow x");
        assert.strictEqual(ast[0].type, "ELEMENT");
        assert.strictEqual(ast[0].element, "FLOW");
    });

    it("throws on invalid elements", () => {
        assert.throws(() => {
            analyze("water x");
        }, SemanticError);
    });

    it("validates seasons", () => {
        const ast = analyze("flow.spring x");
        assert.strictEqual(ast[0].season, "SPRING");
    });

    it("throws on invalid seasons", () => {
        assert.throws(() => {
            analyze("flow.monsoon x");
        }, SemanticError);
    });

    it("validates ritual structure", () => {
        const ast = analyze("::begin x ::end");
        assert.strictEqual(ast[0].type, "RITUAL");
        assert.strictEqual(ast[0].children.length, 1);
    });

    it("validates seal structure", () => {
        const ast = analyze("[!] x [/!]");
        assert.strictEqual(ast[0].type, "SEAL");
        assert.strictEqual(ast[0].children.length, 1);
    });

    it("throws on empty ritual children array", () => {
        assert.throws(() => {
            analyze("::begin ::end");
        }, SemanticError);
    });

    it("throws on empty seal children array", () => {
        assert.throws(() => {
            analyze("[!] [/!]");
        }, SemanticError);
    });

});
