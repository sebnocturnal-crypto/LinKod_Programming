export class ElementNode {
    constructor(element, season = null, operands = [], token = null) {
        this.type = "ELEMENT";
        this.element = element;     // FLOW, FLAME, DUSK, STONE
        this.season = season;       // SPRING, SUMMER, AUTUMN, WINTER
        this.operands = operands;   // Array of AST nodes
        this.token = token;         // Original token for error reporting
    }

    toString() {
        return `ElementNode(element=${this.element}, season=${this.season}, operands=${this.operands.length})`;
    }
}
