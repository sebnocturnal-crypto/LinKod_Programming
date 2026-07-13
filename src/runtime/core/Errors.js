export class LinKodError extends Error {
    constructor(message, line = null, column = null, type = "RuntimeError") {
        super(message);
        this.name = type;
        this.line = line;
        this.column = column;
    }

    toString() {
        if (this.line !== null && this.column !== null) {
            return `${this.name}: ${this.message} (line ${this.line}, column ${this.column})`;
        }
        return `${this.name}: ${this.message}`;
    }
}

// Lexer Errors
export class LexerError extends LinKodError {
    constructor(message, line, column) {
        super(message, line, column, "LexerError");
    }
}

// Parser Errors
export class ParserError extends LinKodError {
    constructor(message, line, column) {
        super(message, line, column, "ParserError");
    }
}

// Semantic Errors
export class SemanticError extends LinKodError {
    constructor(message, line, column) {
        super(message, line, column, "SemanticError");
    }
}

// Execution Errors
export class ExecutionError extends LinKodError {
    constructor(message, line, column) {
        super(message, line, column, "ExecutionError");
    }
}

// Seal Verification Errors
export class SealError extends LinKodError {
    constructor(message, line, column) {
        super(message, line, column, "SealError");
    }
}
