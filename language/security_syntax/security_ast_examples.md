# LinKod Security AST Examples
Complete abstract syntax tree (AST) examples for all major LinKod security protocols.  
These examples demonstrate how Gate, Mark, Seal, Watch, Lock, and Trace are represented structurally for the interpreter and VM.

---

## 1. AST Structure Overview

Each security node follows this general shape:

{
  type: "SecurityRule",
  rule: "<Glyph>",
  target: "<Target>",
  payload: { ...optional... }
}

Example:
{
  type: "SecurityRule",
  rule: "Gate",
  target: "user"
}

---

# 2. Authentication AST Examples

## 2.1 Identity Establishment
Protocol:
Mark(user:<id>)
Watch(user)
Gate(user)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Mark", key: "user", value: "<id>" },
    { type: "SecurityRule", rule: "Watch", target: "user" },
    { type: "SecurityRule", rule: "Gate", target: "user" }
  ]
}

---

## 2.2 Role‑Based Authentication
Protocol:
Mark(role:<value>)
Watch(role)
Gate(role)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Mark", key: "role", value: "<value>" },
    { type: "SecurityRule", rule: "Watch", target: "role" },
    { type: "SecurityRule", rule: "Gate", target: "role" }
  ]
}

---

## 2.3 Multi‑Factor Authentication
Protocol:
Mark(user:<id>)
Watch(user)
Mark(token:<value>)
Watch(token)
Gate(user)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Mark", key: "user", value: "<id>" },
    { type: "SecurityRule", rule: "Watch", target: "user" },
    { type: "SecurityRule", rule: "Mark", key: "token", value: "<value>" },
    { type: "SecurityRule", rule: "Watch", target: "token" },
    { type: "SecurityRule", rule: "Gate", target: "user" }
  ]
}

---

# 3. Authorization AST Examples

## 3.1 Resource Access
Protocol:
Watch(resource)
Gate(resource)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Watch", target: "resource" },
    { type: "SecurityRule", rule: "Gate", target: "resource" }
  ]
}

---

## 3.2 Conditional Access
Protocol:
Frame-Split Gate(resource)

AST:
{
  type: "Program",
  body: [
    {
      type: "Expression",
      modifier: "Frame-Split",
      child: {
        type: "SecurityRule",
        rule: "Gate",
        target: "resource"
      }
    }
  ]
}

---

## 3.3 Group Authorization
Protocol:
Watch-Circle
Gate(group)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Watch", target: "group" },
    { type: "SecurityRule", rule: "Gate", target: "group" }
  ]
}

---

# 4. Encryption AST Examples

## 4.1 Basic Encryption
Protocol:
Seal(payload)

AST:
{
  type: "SecurityRule",
  rule: "Seal",
  payload: { payload }
}

---

## 4.2 Encrypted Transmission
Protocol:
Seal(payload) → Flow(data)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Seal", payload: { payload } },
    { type: "Expression", rule: "Flow", data: "data" }
  ]
}

---

## 4.3 Identity‑Bound Encryption
Protocol:
Mark(user:<id>) → Seal({ owner:<id>, data })

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Mark", key: "user", value: "<id>" },
    {
      type: "SecurityRule",
      rule: "Seal",
      payload: { owner: "<id>", data }
    }
  ]
}

---

# 5. Verification AST Examples

## 5.1 Identity Verification
Protocol:
Watch(identity)

AST:
{
  type: "SecurityRule",
  rule: "Watch",
  target: "identity"
}

---

## 5.2 Multi‑Layer Verification
Protocol:
Watch(user) → Watch(role) → Watch(resource)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Watch", target: "user" },
    { type: "SecurityRule", rule: "Watch", target: "role" },
    { type: "SecurityRule", rule: "Watch", target: "resource" }
  ]
}

---

# 6. Restriction AST Examples

## 6.1 Lock Resource
Protocol:
Lock(resource)

AST:
{
  type: "SecurityRule",
  rule: "Lock",
  target: "resource"
}

---

## 6.2 Lock After Access
Protocol:
Gate(resource) → Lock(resource)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Gate", target: "resource" },
    { type: "SecurityRule", rule: "Lock", target: "resource" }
  ]
}

---

## 6.3 Conditional Lock
Protocol:
Shift-Frame Lock(resource)

AST:
{
  type: "Program",
  body: [
    {
      type: "Expression",
      modifier: "Shift-Frame",
      child: {
        type: "SecurityRule",
        rule: "Lock",
        target: "resource"
      }
    }
  ]
}

---

# 7. Audit AST Examples

## 7.1 Basic Audit
Protocol:
Trace(event)

AST:
{
  type: "SecurityRule",
  rule: "Trace",
  target: "event"
}

---

## 7.2 Full Access Audit
Protocol:
Mark(user:<id>) → Gate(resource) → Trace(access)

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Mark", key: "user", value: "<id>" },
    { type: "SecurityRule", rule: "Gate", target: "resource" },
    { type: "SecurityRule", rule: "Trace", target: "access" }
  ]
}

---

## 7.3 Encrypted Audit Trail
Protocol:
Trace(event) → Seal({ trace })

AST:
{
  type: "Program",
  body: [
    { type: "SecurityRule", rule: "Trace", target: "event" },
    { type: "SecurityRule", rule: "Seal", payload: { trace: true } }
  ]
}

---

## Version
LinKod Security AST Examples v1.0
