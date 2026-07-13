import { SemanticError } from "../core/Errors.js";

export class SemanticEngine {
    constructor(ast) {
        this.ast = ast;
        this.symbols = new Map(); // future variable bindings
    }

    analyze() {
        for (const node of this.ast) {
            this.visit(node);
        }
        return this.ast;
    }

    visit(node) {
        switch (node.type) {
            case "RITUAL":
                return this.visitRitual(node);

            case "SEAL":
                return this.visitSeal(node);

            case "ELEMENT":
                return this.visitElement(node);

            case "IDENTIFIER":
                return this.visitIdentifier(node);

            case "LITERAL":
                return this.visitLiteral(node);

            default:
                throw new SemanticError(
                    `Unknown AST node type: ${node.type}`,
                    node.token?.line,
                    node.token?.column
                );
        }
    }

    // -----------------------------
    // Ritual Validation
    // -----------------------------
    visitRitual(node) {
        if (!node.children || !Array.isArray(node.children)) {
            throw new SemanticError(
                "Ritual must contain a valid children array",
                node.begin.line,
                node.begin.column
            );
        }

        for (const child of node.children) {
            this.visit(child);
        }

        return node;
    }

    // -----------------------------
    // Seal Validation
    // -----------------------------
    visitSeal(node) {
        if (!node.children || !Array.isArray(node.children)) {
            throw new SemanticError(
                "Seal must contain a valid children array",
                node.open.line,
                node.open.column
            );
        }

        for (const child of node.children) {
            this.visit(child);
        }

        return node;
    }

    // -----------------------------
    // Element Validation
    // -----------------------------
    visitElement(node) {
        const validElements = ["FLOW", "FLAME", "DUSK", "STONE"];
        const validSeasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER", null];

        if (!validElements.includes(node.element)) {
            throw new SemanticError(
                `Invalid element: ${node.element}`,
                node.token.line,
                node.token.column
            );
        }

        if (!validSeasons.includes(node.season)) {
            throw new SemanticError(
                `Invalid season modifier: ${node.season}`,
                node.token.line,
                node.token.column
            );
        }

        // Validate operands
        for (const operand of node.operands) {
            this.visit(operand);
        }

        return node;
    }

    // -----------------------------
    // Identifier Validation
    // -----------------------------
    visitIdentifier(node) {
        // Future: ensure identifier exists in symbol table
        return node;
    }

    // -----------------------------
    // Literal Validation
    // -----------------------------
    visitLiteral(node) {
        if (node.value === undefined) {
            throw new SemanticError(
                "Literal has no value",
                node.token.line,
                node.token.column
            );
        }
        return node;
    }
}
