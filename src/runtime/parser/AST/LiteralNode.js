export class LiteralNode {
    constructor(value, token) {
        this.type = "LITERAL";
        this.value = value;     // Number or string literal
        this.token = token;     // Original token for error reporting
    }

    toString() {
        return `LiteralNode(value=${this.value})`;
    }
}
