export class RitualNode {
    constructor(beginToken, children = [], endToken) {
        this.type = "RITUAL";
        this.begin = beginToken;   // Token: RITUAL_BEGIN
        this.children = children;  // Array of AST nodes
        this.end = endToken;       // Token: RITUAL_END
    }

    toString() {
        return `RitualNode(begin=${this.begin.value}, children=${this.children.length}, end=${this.end.value})`;
    }
}
