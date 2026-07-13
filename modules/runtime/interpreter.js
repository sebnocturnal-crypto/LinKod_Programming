// modules/runtime/interpreter.js
// LinKod Interpreter
// Walks AST nodes, applies semantics and security rules, and updates runtime state.

import { loadGlyphMetadata } from '../core/glyph_registry.js';
import { evaluateSecurity } from '../security/permission.js';
import { resolveSemantics } from '../parser/compound_resolver.js';
import { RuntimeState } from './runtime_state.js';

export class Interpreter {
  constructor(options = {}) {
    this.state = new RuntimeState(options.context || {});
    this.glyphs = loadGlyphMetadata();
    this.options = options;
  }

  /**
   * Entry point: execute a glyph program.
   * @param {Object} ast - Abstract Syntax Tree representing the glyph program.
   * @returns {Object} result - Final runtime state or output payload.
   */
  execute(ast) {
    if (!ast || !ast.type) {
      throw new Error('Interpreter.execute: invalid AST');
    }

    return this._evalNode(ast);
  }

  /**
   * Evaluate a single AST node.
   * @param {Object} node
   * @returns {any}
   */
  _evalNode(node) {
    switch (node.type) {
      case 'Program':
        return this._evalProgram(node);

      case 'Expression':
        return this._evalExpression(node);

      case 'SecurityRule':
        return this._evalSecurityRule(node);

      case 'GlyphSequence':
        return this._evalGlyphSequence(node);

      default:
        throw new Error(`Interpreter: unknown node type "${node.type}"`);
    }
  }

  /**
   * Evaluate the root program node.
   * @param {Object} node
   */
  _evalProgram(node) {
    let result = null;

    for (const child of node.body) {
      result = this._evalNode(child);
    }

    return {
      state: this.state,
      result,
    };
  }

  /**
   * Evaluate a generic expression node.
   * @param {Object} node
   */
  _evalExpression(node) {
    const resolved = resolveSemantics(node, this.glyphs, this.state);
    // You can extend this to handle different expression subtypes.
    return resolved;
  }

  /**
   * Evaluate a security rule node (Gate, Mark, Seal, Watch, Lock, Trace).
   * @param {Object} node
   */
  _evalSecurityRule(node) {
    const decision = evaluateSecurity(node, this.state, this.glyphs);

    // Optionally update state with security decision
    this.state.logSecurityDecision(node, decision);

    return decision;
  }

  /**
   * Evaluate a raw glyph sequence node.
   * @param {Object} node
   */
  _evalGlyphSequence(node) {
    const { sequence } = node;

    if (!Array.isArray(sequence)) {
      throw new Error('GlyphSequence node must contain an array of glyphs');
    }

    const resolved = resolveSemantics(
      { type: 'Expression', glyphs: sequence },
      this.glyphs,
      this.state
    );

    return resolved;
  }
}

// Optional helper for quick usage
export function runProgram(ast, options = {}) {
  const interpreter = new Interpreter(options);
  return interpreter.execute(ast);
}
