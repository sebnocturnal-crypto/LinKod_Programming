import assert from "assert";
import { Lexer } from "../src/runtime/lexer/Lexer.js";
import { Parser } from "../src/runtime/parser/Parser.js";
import { SemanticEngine } from "../src/runtime/semantic/SemanticEngine.js";
import { ExecutionEngine } from "../src/runtime/execution/ExecutionEngine.js";
import { ExecutionError } from "../src/runtime/core/Errors.js";

function run(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();

    const parser = new Parser(tokens);
    const ast = parser.parse();

    const semantic = new SemanticEngine(ast);
    semantic.analyze();

    const exec = new ExecutionEngine(ast);
    return exec.run();
}

describe("ExecutionEngine", () => {

    it("executes literals", () => {
        const result = run("42");
        // run() returns nothing, but literal execution returns values internally
        // so we directly test the literal execution path
        const lexer = new Lexer("42");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);
        const value = exec.execute(ast[0]);
        assert.strictEqual(value, "42");
    });

    it("throws on undefined identifiers", () => {
        assert.throws(() => {
            run("x");
        }, ExecutionError);
    });

    it("executes FLOW element", () => {
        const lexer = new Lexer("flow 7");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        const result = exec.execute(ast[0]);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0], "7");
    });

    it("executes FLAME element", () => {
        const lexer = new Lexer("flame 7");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        const result = exec.execute(ast[0]);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0], "7");
    });

    it("executes DUSK element", () => {
        const lexer = new Lexer("dusk 7");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        const result = exec.execute(ast[0]);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0], "7");
    });

    it("executes STONE element", () => {
        const lexer = new Lexer("stone 7");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        const result = exec.execute(ast[0]);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0], "7");
    });

    it("executes ritual blocks", () => {
        const lexer = new Lexer("::begin 7 ::end");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        // Ritual returns null but executes children
        const result = exec.execute(ast[0]);
        assert.strictEqual(result, null);
    });

    it("executes seal blocks", () => {
        const lexer = new Lexer("[!] 7 [/!]");
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();
        const exec = new ExecutionEngine(ast);

        const result = exec.execute(ast[0]);
        assert.strictEqual(result, null);
    });

});
