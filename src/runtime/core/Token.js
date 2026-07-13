export class Token {
    constructor(type, value, element = null, season = null, line = 0, column = 0) {
        this.type = type;       // Token classification (FLOW, GLYPH, NUMBER, IDENTIFIER, etc.)
        this.value = value;     // Raw glyph or text
        this.element = element; // Element identity (FLOW, FLAME, DUSK, STONE)
        this.season = season;   // Season modifier (SPRING, SUMMER, AUTUMN, WINTER)
        this.line = line;       // Line number in source code
        this.column = column;   // Column number in source code
    }

    toString() {
        return `Token(${this.type}, "${this.value}", element=${this.element}, season=${this.season}, line=${this.line}, column=${this.column})`;
    }
}
