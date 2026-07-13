import assert from "assert";
import { Lexer } from "../src/runtime/lexer/Lexer.js";
import { Parser } from "../src/runtime/parser/Parser.js";

function parse(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
}

describe("Parser", () => {

    it("parses identifiers", () => {
        const ast = parse("hello");
        assert.strictEqual(ast[0].type, "IDENTIFIER");
        assert.strictEqual(ast[0].name, "hello");
    });

    it("parses number literals", () => {
        const ast = parse("42");
        assert.strictEqual(ast[0].type, "LITERAL");
        assert.strictEqual(ast[0].value, "42");
    });

    it("parses string literals", () => {
        const ast = parse('"world"');
        assert.strictEqual(ast[0].type, "LITERAL");
        assert.strictEqual(ast[0].value, "world");
    });

    it("parses elements with operands", () => {
        const ast = parse("flow x 7");
        const node = ast[0];

        assert.strictEqual(node.type, "ELEMENT");
        assert.strictEqual(node.element, "FLOW");
        assert.strictEqual(node.operands.length, 2);
        assert.strictEqual(node.operands[0].type, "IDENTIFIER");
        assert.strictEqual(node.operands[1].type, "LITERAL");
    });

    it("parses rituals", () => {
        const ast = parse("::begin x ::end");
        const node = ast[0];

        assert.strictEqual(node.type, "RITUAL");
        assert.strictEqual(node.children.length, 1);
        assert.strictEqual(node.children[0].type, "IDENTIFIER");
    });

    it("parses seals", () => {
        const ast = parse("[!] x [/!]");
        const node = ast[0];

        assert.strictEqual(node.type, "SEAL");
        assert.strictEqual(node.children.length, 1);
        assert.strictEqual(node.children[0].type, "IDENTIFIER");
    });

    it("throws on unexpected tokens", () => {
        assert.throws(() => {
            parse("::end");
        }, /Unexpected token/);
    });

});
