import { ParserError } from "../core/Errors.js";
import {
    RitualNode,
    ElementNode,
    SealNode,
    IdentifierNode,
    LiteralNode
} from "./AST/index.js";

export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    peek() {
        return this.tokens[this.position] || null;
    }

    advance() {
        const tok = this.peek();
        this.position++;
        return tok;
    }

    expect(type) {
        const tok = this.peek();
        if (!tok || tok.type !== type) {
            throw new ParserError(
                `Expected ${type} but found ${tok ? tok.type : "EOF"}`,
                tok?.line,
                tok?.column
            );
        }
        return this.advance();
    }

    parse() {
        const nodes = [];

        while (this.peek() && this.peek().type !== "EOF") {
            nodes.push(this.parseStatement());
        }

        return nodes;
    }

    parseStatement() {
        const tok = this.peek();

        // Ritual
        if (tok.type === "RITUAL_BEGIN") {
            return this.parseRitual();
        }

        // Seal
        if (tok.type === "SEAL_OPEN") {
            return this.parseSeal();
        }

        // Element
        if (["FLOW", "FLAME", "DUSK", "STONE"].includes(tok.type)) {
            return this.parseElement();
        }

        // Identifier
        if (tok.type === "IDENTIFIER") {
            return this.parseIdentifier();
        }

        // Literal
        if (tok.type === "NUMBER" || tok.type === "STRING") {
            return this.parseLiteral();
        }

        throw new ParserError(
            `Unexpected token: ${tok.type}`,
            tok.line,
            tok.column
        );
    }

    parseRitual() {
        const begin = this.expect("RITUAL_BEGIN");

        const children = [];

        while (this.peek() && this.peek().type !== "RITUAL_END") {
            children.push(this.parseStatement());
        }

        const end = this.expect("RITUAL_END");

        return new RitualNode(begin, children, end);
    }

    parseSeal() {
        const open = this.expect("SEAL_OPEN");

        const children = [];

        while (this.peek() && this.peek().type !== "SEAL_CLOSE") {
            children.push(this.parseStatement());
        }

        const close = this.expect("SEAL_CLOSE");

        return new SealNode(open, children, close);
    }

    parseElement() {
        const tok = this.advance();

        const element = tok.element;
        const season = tok.season;

        const operands = [];

        // Optional operands
        while (this.peek() && ["IDENTIFIER", "NUMBER", "STRING"].includes(this.peek().type)) {
            operands.push(this.parseStatement());
        }

        return new ElementNode(element, season, operands, tok);
    }

    parseIdentifier() {
        const tok = this.expect("IDENTIFIER");
        return new IdentifierNode(tok.value, tok);
    }

    parseLiteral() {
        const tok = this.advance();
        return new LiteralNode(tok.value, tok);
    }
}
