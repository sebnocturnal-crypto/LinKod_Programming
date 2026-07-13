import { SealError } from "../core/Errors.js";

export class SealEngine {
    constructor(ast) {
        this.ast = ast;
        this.identityRoles = new Set();   // future: @roles inside seals
    }

    verify() {
        for (const node of this.ast) {
            this.visit(node);
        }
        return true;
    }

    visit(node) {
        switch (node.type) {
            case "SEAL":
                return this.verifySeal(node);

            case "RITUAL":
                return this.visitRitual(node);

            case "ELEMENT":
                return this.visitElement(node);

            case "IDENTIFIER":
            case "LITERAL":
                return node;

            default:
                throw new SealError(
                    `Unknown AST node type in SealEngine: ${node.type}`,
                    node.token?.line,
                    node.token?.column
                );
        }
    }

    // -----------------------------
    // Seal Validation
    // -----------------------------
    verifySeal(node) {
        // Example rule: seals cannot be empty
        if (!node.children || node.children.length === 0) {
            throw new SealError(
                "Seal block cannot be empty",
                node.open.line,
                node.open.column
            );
        }

        // Example rule: seals cannot contain other seals (nested seals forbidden)
        for (const child of node.children) {
            if (child.type === "SEAL") {
                throw new SealError(
                    "Nested seals are not allowed",
                    child.open.line,
                    child.open.column
                );
            }
        }

        // Example rule: identity roles must be declared inside seals
        for (const child of node.children) {
            this.visit(child);
        }

        return node;
    }

    // -----------------------------
    // Ritual Validation (inside seals)
    // -----------------------------
    visitRitual(node) {
        for (const child of node.children) {
            this.visit(child);
        }
        return node;
    }

    // -----------------------------
    // Element Validation (inside seals)
    // -----------------------------
    visitElement(node) {
        const forbiddenInsideSeal = ["FLAME"]; // example rule

        if (forbiddenInsideSeal.includes(node.element)) {
            throw new SealError(
                `Element ${node.element} cannot be used inside a seal`,
                node.token.line,
                node.token.column
            );
        }

        for (const operand of node.operands) {
            this.visit(operand);
        }

        return node;
    }
}
