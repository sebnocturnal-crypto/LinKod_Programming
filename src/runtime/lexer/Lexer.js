import { Token } from "../core/Token.js";

export class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.line = 1;
        this.column = 1;
        this.tokens = [];
    }

    peek() {
        return this.input[this.position] || null;
    }

    advance() {
        const ch = this.peek();
        if (ch === "\n") {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        this.position++;
        return ch;
    }

    emit(type, value, element = null, season = null) {
        this.tokens.push(
            new Token(type, value, element, season, this.line, this.column)
        );
    }

    isWhitespace(ch) {
        return /\s/.test(ch);
    }

    isDigit(ch) {
        return /[0-9]/.test(ch);
    }

    isLetter(ch) {
        return /[a-zA-Z]/.test(ch);
    }

    isGlyph(ch) {
        return /[^\x00-\x7F]/.test(ch);
    }

    readNumber() {
        let num = "";
        while (this.isDigit(this.peek())) {
            num += this.advance();
        }
        this.emit("NUMBER", num);
    }

    readString() {
        let str = "";
        this.advance(); // opening quote
        while (this.peek() !== '"' && this.peek() !== null) {
            str += this.advance();
        }
        this.advance(); // closing quote
        this.emit("STRING", str);
    }

    readIdentifier() {
        let id = "";
        while (this.isLetter(this.peek())) {
            id += this.advance();
        }

        const keywords = {
            flow: "FLOW",
            flame: "FLAME",
            dusk: "DUSK",
            stone: "STONE",
            spring: "SPRING",
            summer: "SUMMER",
            autumn: "AUTUMN",
            winter: "WINTER",
            ritual: "RITUAL_BEGIN",
            endritual: "RITUAL_END",
            seal: "SEAL_OPEN",
            endseal: "SEAL_CLOSE"
        };

        if (keywords[id]) {
            this.emit(keywords[id], id, keywords[id].includes("FLOW") ? id.toUpperCase() : null);
        } else {
            this.emit("IDENTIFIER", id);
        }
    }

    readIdentityRole() {
        let role = "";
        role += this.advance(); // '@'
        while (this.isLetter(this.peek())) {
            role += this.advance();
        }
        this.emit("IDENTITY_ROLE", role);
    }

    readGlyph() {
        const glyph = this.advance();
        this.emit("GLYPH", glyph);
    }

    nextToken() {
        while (this.isWhitespace(this.peek())) {
            this.advance();
        }

        const ch = this.peek();
        if (ch === null) {
            this.emit("EOF", "");
            return;
        }

        // Numbers
        if (this.isDigit(ch)) {
            this.readNumber();
            return;
        }

        // Strings
        if (ch === '"') {
            this.readString();
            return;
        }

        // Identifiers / keywords
        if (this.isLetter(ch)) {
            this.readIdentifier();
            return;
        }

        // Identity roles
        if (ch === "@") {
            this.readIdentityRole();
            return;
        }

        // Glyphs
        if (this.isGlyph(ch)) {
            this.readGlyph();
            return;
        }

        // Rituals
        if (this.input.startsWith("::begin", this.position)) {
            this.emit("RITUAL_BEGIN", "::begin");
            this.position += 7;
            return;
        }

        if (this.input.startsWith("::end", this.position)) {
            this.emit("RITUAL_END", "::end");
            this.position += 5;
            return;
        }

        // Seals
        if (this.input.startsWith("[!]", this.position)) {
            this.emit("SEAL_OPEN", "[!]");
            this.position += 3;
            return;
        }

        if (this.input.startsWith("[/!]", this.position)) {
            this.emit("SEAL_CLOSE", "[/!]");
            this.position += 4;
            return;
        }

        // Operators
        const operators = {
            "+": "PLUS",
            "-": "MINUS",
            "*": "STAR",
            "/": "SLASH",
            "=": "ASSIGN",
            "(": "LPAREN",
            ")": "RPAREN",
            "{": "LBRACE",
            "}": "RBRACE",
            ",": "COMMA",
            ":": "COLON",
            ";": "SEMICOLON"
        };

        if (operators[ch]) {
            this.emit(operators[ch], this.advance());
            return;
        }

        // Unknown
        this.emit("UNKNOWN", this.advance());
    }

    tokenize() {
        while (this.position < this.input.length) {
            this.nextToken();
        }
        return this.tokens;
    }
}
