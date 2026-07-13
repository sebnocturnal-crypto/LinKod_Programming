export class IdentifierNode {
    constructor(name, token) {
        this.type = "IDENTIFIER";
        this.name = name;     // Identifier string
        this.token = token;   // Original token for error reporting
    }

    toString() {
        return `IdentifierNode(name=${this.name})`;
    }
}
