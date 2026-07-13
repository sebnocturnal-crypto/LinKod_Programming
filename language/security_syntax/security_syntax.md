# LinKod Security Syntax
Defines the symbolic security grammar for Gate, Mark, Seal, Watch, Lock, and Trace.  
These glyphs form the foundation of LinKod’s security layer and govern access, identity, protection, verification, restriction, and auditing.

---

## 1. Security Glyph Categories

### Gate
- Meaning: access, permission
- Function: checks whether a target is open or closed

### Mark
- Meaning: identity token, signature
- Function: assigns or updates identity context

### Seal
- Meaning: protection, encryption
- Function: wraps or encrypts payloads

### Watch
- Meaning: monitoring, verification
- Function: verifies identity or permission targets

### Lock
- Meaning: restriction, sealed access
- Function: closes or restricts a target

### Trace
- Meaning: audit trail, forensic mark
- Function: records security events

---

## 2. Security Expression Structure

Security expressions follow a consistent structural pattern:
<SecurityGlyph> ( <Target> ) [ <Payload> ]


Where:

- **SecurityGlyph** is one of: Gate, Mark, Seal, Watch, Lock, Trace  
- **Target** is optional and refers to identity or permission keys  
- **Payload** is optional and used by Seal, Mark, Trace

Examples:

Gate(user)
Mark(role:admin)
Seal({ message: "hello" })
Watch(identity)
Lock(resource)
Trace(event)

---

## 3. Gate Syntax

### Form
Gate(target)


### Behavior
- Checks if `target` is open or permitted
- Returns `allowed: true` or `allowed: false`

### Examples
Gate(access)
Gate(channel)
Gate(user)

---

## 4. Mark Syntax

### Form
Mark(key:value)


### Behavior
- Assigns identity values
- Updates runtime identity context

### Examples
Mark(user:Sebastian)
Mark(role:creator)
Mark(origin:root)

---

## 5. Seal Syntax

### Form
Seal(payload)

### Behavior
- Encrypts or protects payload
- Produces a sealed object

### Examples
Seal({ token: 12345 })
Seal({ message: "secure" })
Seal(data)

---

## 6. Watch Syntax

### Form
Watch(target)

### Behavior
- Verifies identity or permission existence
- Returns `allowed: true` if target exists

### Examples
Watch(user)
Watch(role)
Watch(permission)

---

## 7. Lock Syntax

### Form
Lock(target)

### Behavior
- Restricts or closes access to target
- Updates permission context

### Examples
Lock(access)
Lock(channel)
Lock(resource)

---

## 8. Trace Syntax

### Form
Trace(event)

### Behavior
- Records audit information
- Stores identity + permission snapshot

### Examples
Trace(login)
Trace(change)
Trace(seal)

---

## 9. Compound Security Expressions

Security glyphs may combine with logic or identity glyphs:

### Gate-Mark
Gate(user) Mark(role:admin)

### Seal-Flow
Seal(payload) Flow(data)

### Watch-Circle
Watch(group)

### Lock-Gate
Lock(resource) Gate(resource)

### Trace-Mark
Trace(identity) Mark(user:Sebastian)

---

## 10. Security Grammar Rules

### Rule 1 — Order
Security expressions evaluate left to right.

### Rule 2 — Context
Mark and Lock modify runtime context; Gate and Watch read it.

### Rule 3 — Payload
Only Seal and Trace accept structured payloads.

### Rule 4 — Nesting
Security expressions may nest inside glyph sequences:

[ Bond-Origin ] Seal({ message })
Gate(access)

### Rule 5 — Composition
Security glyphs may combine with logic glyphs to form conditional rules:
Frame-Split Gate(user)
Shift-Frame Lock(resource)

---

## Version
LinKod Security Syntax v1.0  
Defines symbolic security grammar for the LinKod language system.

