export class SealNode {
    constructor(openToken, children = [], closeToken) {
        this.type = "SEAL";
        this.open = openToken;     // Token: SEAL_OPEN
        this.children = children;  // Array of AST nodes inside the seal block
        this.close = closeToken;   // Token: SEAL_CLOSE
    }

    toString() {
        return `SealNode(open=${this.open.value}, children=${this.children.length}, close=${this.close.value})`;
    }
}
