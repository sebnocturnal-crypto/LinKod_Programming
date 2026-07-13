import { ExecutionError } from "../core/Errors.js";

export class ExecutionEngine {
    constructor(ast) {
        this.ast = ast;
        this.contextStack = [];   // ritual/seal scopes
        this.memory = new Map();  // identifier bindings (future expansion)
    }

    run() {
        for (const node of this.ast) {
            this.execute(node);
        }
    }

    execute(node) {
        switch (node.type) {
            case "RITUAL":
                return this.executeRitual(node);

            case "SEAL":
                return this.executeSeal(node);

            case "ELEMENT":
                return this.executeElement(node);

            case "IDENTIFIER":
                return this.executeIdentifier(node);

            case "LITERAL":
                return this.executeLiteral(node);

            default:
                throw new ExecutionError(
                    `Unknown AST node type: ${node.type}`,
                    node.token?.line,
                    node.token?.column
                );
        }
    }

    // -----------------------------
    // Ritual Execution
    // -----------------------------
    executeRitual(node) {
        this.contextStack.push({ type: "RITUAL" });

        for (const child of node.children) {
            this.execute(child);
        }

        this.contextStack.pop();
        return null;
    }

    // -----------------------------
    // Seal Execution
    // -----------------------------
    executeSeal(node) {
        this.contextStack.push({ type: "SEAL" });

        for (const child of node.children) {
            this.execute(child);
        }

        this.contextStack.pop();
        return null;
    }

    // -----------------------------
    // Element Execution
    // -----------------------------
    executeElement(node) {
        const { element, season, operands, token } = node;

        // Apply season timing behavior
        switch (season) {
            case "SPRING":   /* parallel */ break;
            case "SUMMER":   /* accelerated */ break;
            case "AUTUMN":   /* delayed */ break;
            case "WINTER":   /* locked */ break;
        }

        // Execute element behavior
        switch (element) {
            case "FLOW":
                return this.execFlow(operands, token);

            case "FLAME":
                return this.execFlame(operands, token);

            case "DUSK":
                return this.execDusk(operands, token);

            case "STONE":
                return this.execStone(operands, token);

            default:
                throw new ExecutionError(
                    `Unknown element: ${element}`,
                    token.line,
                    token.column
                );
        }
    }

    // -----------------------------
    // Element Behaviors
    // -----------------------------
    execFlow(operands, token) {
        // FLOW = movement, transfer, reading
        return operands.map(op => this.execute(op));
    }

    execFlame(operands, token) {
        // FLAME = action, transformation
        return operands.map(op => this.execute(op));
    }

    execDusk(operands, token) {
        // DUSK = interpretation, harmonization
        return operands.map(op => this.execute(op));
    }

    execStone(operands, token) {
        // STONE = structure, foundation
        return operands.map(op => this.execute(op));
    }

    // -----------------------------
    // Identifier Execution
    // -----------------------------
    executeIdentifier(node) {
        if (!this.memory.has(node.name)) {
            throw new ExecutionError(
                `Undefined identifier: ${node.name}`,
                node.token.line,
                node.token.column
            );
        }
        return this.memory.get(node.name);
    }

    // -----------------------------
    // Literal Execution
    // -----------------------------
    executeLiteral(node) {
        return node.value;
    }
}
