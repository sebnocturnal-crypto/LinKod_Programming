# STYLE.md — LinKod Official Style Guide

## Overview
LinKod is a mythic‑symbolic security language built on glyphs, rituals, seals, and modules.  
This style guide defines the official naming, formatting, and structural conventions for all LinKod source files, examples, documentation, and runtime components.

Consistency in symbolic expression is essential.  
LinKod is not only a programming language — it is an identity system.

---

## 1. Glyph Style Rules
Glyphs are the atomic symbolic units of LinKod.

### 1.1 Definition
A glyph is a single Unicode symbol representing:
- elemental forces  
- metaphysical primitives  
- identity anchors  
- security classifications  

### 1.2 Naming Rules
- Must be one Unicode character  
- Must not be ASCII letters or digits  
- Must not be multi‑character strings  
- Prefer symbols from:
  - Alchemical Unicode  
  - Geometric Unicode  
  - Mythic Unicode blocks  
  - LinKod’s custom glyph set  

### 1.3 Examples
⟁ ⚚ ✦ ⟡ ⧉

### 1.4 Runtime Requirements
Every glyph must map to:
- a semantic meaning  
- a type  
- a security level  
- an identity binding  

---

## 2. Ritual Style Rules
Rituals are executable symbolic procedures.

### 2.1 Purpose
A ritual:
- performs an action  
- transforms state  
- invokes glyph logic  
- binds identity  

### 2.2 Naming Rules
- lowercase-kebab-case  
- Must begin with a verb  
- No underscores  
- No camelCase  
- Optional glyph prefix  

### 2.3 Examples
invoke-light  
bind-seal  
summon-ward  
⟁-cleanse  
✦-ignite  

### 2.4 Ritual Blocks
Ritual blocks must be formatted with:
- opening keyword  
- indented body  
- closing keyword (if required by syntax version)

---

## 3. Seal Style Rules
Seals define identity, access, and security constraints.

### 3.1 Purpose
A seal:
- restricts access  
- binds rituals to identities  
- enforces security rules  
- defines trust boundaries  

### 3.2 Naming Rules
- PascalCase  
- Must end with “Seal”  
- May include a glyph prefix  
- No hyphens  
- No snake_case  

### 3.3 Examples
IdentitySeal  
WardSeal  
RitualSeal  
✦FlameSeal  

### 3.4 Seal Blocks
Seal blocks must:
- declare identity  
- declare constraints  
- declare allowed rituals  

---

## 4. Module Style Rules
Modules are reusable collections of rituals, glyphs, and seals.

### 4.1 Naming Rules
- kebab-case  
- Must describe responsibility  
- Optional glyph prefix  
- No PascalCase  
- No spaces  

### 4.2 Examples
core-glyphs  
ritual-library  
seal-system  
⟁-elemental-forms  

---

## 5. File Naming Rules

### 5.1 JavaScript Runtime Files
- kebab-case.js for modules  
- PascalCase.js for classes  
- index.js only when exporting a folder’s public API  

### Examples
lexer.js  
parser.js  
execution-engine.js  
SealEngine.js  
GlyphRegistry.js  

---

## 6. Folder Naming Rules
All top-level folders must be lowercase and hyphen-separated.

### Required Structure
docs/  
examples/  
modules/  
runtime/  
tests/  

### Folder Responsibilities
docs/ — specifications, governance, policies  
examples/ — minimal LinKod scripts  
modules/ — symbolic libraries  
runtime/ — lexer, parser, semantic, execution  
tests/ — validation suite  

---

## 7. Test Style Rules

### 7.1 File Naming
parser.test.js  
execution.test.js  
seal-engine.test.js  

### 7.2 Structure
describe("ComponentName", () => {  
  it("describes expected behavior", () => {  
    ...  
  });  
});

### 7.3 Expectations
- Tests must be deterministic  
- Tests must validate symbolic behavior  
- Tests must validate identity enforcement  

---

## 8. Documentation Style Rules

### 8.1 File Naming
All documentation files must use PascalCase.md.

Examples:
Brand-Guidelines.md  
Governance-Model.md  
Trademark-Policy.md  
Security-Policy.md  
CLA.md  

### 8.2 Tone
Documentation must be:
- formal  
- symbolic  
- consistent  
- identity-focused  

---

## 9. Code Formatting Rules

### 9.1 Indentation
2 spaces  
No tabs  

### 9.2 Line Length
Maximum 100 characters  

### 9.3 Braces
Opening brace on same line  
Closing brace aligned with block start  

### 9.4 Comments
Use // for single-line comments  
Use /** */ for documentation comments  

---

## 10. Symbolic Integrity Rules
LinKod is a symbolic language.  
Therefore:

- Ritual names must reflect action  
- Seal names must reflect identity  
- Glyphs must reflect metaphysical meaning  
- Modules must reflect responsibility  

Symbolic consistency is required for all contributions.

---

# End of STYLE.md
