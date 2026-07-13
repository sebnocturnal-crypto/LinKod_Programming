#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Lexer } from "../runtime/lexer/Lexer.js";
import { Parser } from "../runtime/parser/Parser.js";
import { SemanticEngine } from "../runtime/semantic/SemanticEngine.js";
import { ExecutionEngine } from "../runtime/execution/ExecutionEngine.js";
import { SealEngine } from "../runtime/seal/SealEngine.js";

// ---------------------------------------------
// CLI Argument Handling
// ---------------------------------------------
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("Usage: linKod <file.lk>");
    process.exit(1);
}

const filePath = path.resolve(process.cwd(), args[0]);

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

// ---------------------------------------------
// Load Source Code
// ---------------------------------------------
const source = fs.readFileSync(filePath, "utf8");

// ---------------------------------------------
// Flow Layer — Lexer
// ---------------------------------------------
let tokens;
try {
    const lexer = new Lexer(source);
    tokens = lexer.tokenize();
} catch (err) {
    console.error(err.toString());
    process.exit(1);
}

// ---------------------------------------------
// Stone Layer — Parser
// ---------------------------------------------
let ast;
try {
    const parser = new Parser(tokens);
    ast = parser.parse();
} catch (err) {
    console.error(err.toString());
    process.exit(1);
}

// ---------------------------------------------
// Dusk Layer — Semantic Analysis
// ---------------------------------------------
try {
    const semantic = new SemanticEngine(ast);
    semantic.analyze();
} catch (err) {
    console.error(err.toString());
    process.exit(1);
}

// ---------------------------------------------
// Winter Layer — Seal Verification
// ---------------------------------------------
try {
    const seal = new SealEngine(ast);
    seal.verify();
} catch (err) {
    console.error(err.toString());
    process.exit(1);
}

// ---------------------------------------------
// Flame Layer — Execution
// ---------------------------------------------
try {
    const exec = new ExecutionEngine(ast);
    exec.run();
} catch (err) {
    console.error(err.toString());
    process.exit(1);
}
