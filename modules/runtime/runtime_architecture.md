# LinKod Runtime Architecture (VM + Interpreter)

## Overview
The LinKod runtime is a virtual machine (VM) and interpreter that executes glyph-based programs.  
It connects the glyph system, language modules, and security logic into a single engine.

---

## Layered Design

### 1. Glyph Layer
- Source: `/glyphs`, `/modules/core`
- Responsibilities:
  - Load glyph definitions and metadata
  - Provide categories (identity, emotion, logic, action, relation, security)
  - Expose phonology and structural rules

### 2. Language Layer
- Source: `/language`
- Responsibilities:
  - Define grammar, morphology, semantics, and security syntax
  - Map glyph sequences to structured meaning
  - Provide dictionary and syntax tree rules

### 3. Runtime Layer (VM)
- Source: `/modules/runtime`
- Responsibilities:
  - Interpret glyph programs
  - Maintain execution state and context
  - Coordinate security checks and semantic evaluation

---

## Core Components

### Interpreter
- File: `interpreter.js`
- Responsibilities:
  - Accept glyph sequences or ASTs
  - Walk the syntax tree node by node
  - Apply semantic and security rules during execution

### VM Core
- File: `runtime_state.js`
- Responsibilities:
  - Store current context (identity, permissions, environment)
  - Track variables, scopes, and execution frames
  - Provide hooks for logging and error handling

### Loader
- File: `loader.js`
- Responsibilities:
  - Load glyph sets and language modules
  - Initialize runtime configuration
  - Register security and semantic rules

### Optional Compiler
- File: `compiler.js`
- Responsibilities:
  - Convert glyph programs into an intermediate form
  - Optimize repeated patterns
  - Prepare execution plans for the VM

---

## Execution Flow

1. **Input**
   - Glyph sequence, text, or structured message

2. **Lexing**
   - Module: `/modules/parser/lexer.js`
   - Converts glyphs into tokens

3. **Parsing**
   - Module: `/modules/parser/parser.js`
   - Builds an abstract syntax tree (AST)

4. **Semantic Resolution**
   - Module: `/modules/parser/compound_resolver.js`
   - Module: `/language/semantics`
   - Attaches meaning, categories, and context

5. **Security Evaluation**
   - Module: `/modules/security`
   - Applies Gate, Mark, Seal, Watch, Lock, Trace rules
   - Validates permissions and identity

6. **VM Execution**
   - Module: `/modules/runtime/interpreter.js`
   - Walks the AST and performs actions
   - Uses `runtime_state.js` for context

7. **Output**
   - Resulting state, encoded message, or security decision
   - Optional logs via `/modules/utils/logger.js`

---

## Integration Points

### With Glyphs
- Uses `/glyphs/glyphs_v1.md` and `/glyphs/glyphs_v1.1.md` as canonical glyph libraries.
- Reads categories and semantics from glyph metadata.

### With Language Modules
- Uses `/language/grammar`, `/language/semantics`, `/language/security_syntax`.
- Aligns runtime behavior with language rules.

### With Security Engine
- Uses `/modules/security/permission.js`, `identity.js`, `encryption.js`, `protocol.js`.
- Enforces symbolic security at runtime.

---

## Design Principles

- **Layered:** clear separation between glyphs, language, runtime, and security.
- **Symbolic:** all behavior is driven by glyph meaning and structure.
- **Secure by Design:** security glyphs are first-class citizens in the VM.
- **Extensible:** new glyphs, rules, and modules can be added without breaking the core.

---

## Version
LinKod Runtime / VM Architecture v1.0  
Defines the interpreter and VM structure for the LinKod language system.
