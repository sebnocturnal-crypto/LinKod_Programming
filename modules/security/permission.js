// modules/security/permission.js
// LinKod Security Engine
// Evaluates Gate, Mark, Seal, Watch, Lock, Trace rules inside the VM.

import { RuntimeState } from '../runtime/runtime_state.js';

/**
 * Main security evaluation entry point.
 * @param {Object} node - AST node representing a security rule.
 * @param {RuntimeState} state - Current runtime state.
 * @param {Object} glyphs - Glyph metadata registry.
 * @returns {Object} decision - Security decision payload.
 */
export function evaluateSecurity(node, state, glyphs) {
  const rule = node.rule || node.glyph;

  switch (rule) {
    case 'Gate':
      return evalGate(node, state, glyphs);

    case 'Mark':
      return evalMark(node, state, glyphs);

    case 'Seal':
      return evalSeal(node, state, glyphs);

    case 'Watch':
      return evalWatch(node, state, glyphs);

    case 'Lock':
      return evalLock(node, state, glyphs);

    case 'Trace':
      return evalTrace(node, state, glyphs);

    default:
      return {
        allowed: false,
        reason: `Unknown security rule: ${rule}`,
      };
  }
}

//
// ─────────────────────────────────────────────────────────────
//   GATE — Permission Check
// ─────────────────────────────────────────────────────────────
//

function evalGate(node, state, glyphs) {
  const target = node.target || 'default';

  const allowed =
    state.permissions[target] === true ||
    state.permissions[target] === 'open';

  return {
    rule: 'Gate',
    target,
    allowed,
    reason: allowed ? 'Gate open' : 'Gate closed',
  };
}

//
// ─────────────────────────────────────────────────────────────
//   MARK — Identity Assignment
// ─────────────────────────────────────────────────────────────
//

function evalMark(node, state, glyphs) {
  const idKey = node.key || 'identity';
  const idValue = node.value || node.payload || null;

  state.updateIdentity(idKey, idValue);

  return {
    rule: 'Mark',
    key: idKey,
    value: idValue,
    allowed: true,
    reason: 'Identity updated',
  };
}

//
// ─────────────────────────────────────────────────────────────
//   SEAL — Encryption / Protection
// ─────────────────────────────────────────────────────────────
//

function evalSeal(node, state, glyphs) {
  const payload = node.payload || {};
  const sealed = {
    encrypted: true,
    data: payload,
    timestamp: Date.now(),
  };

  return {
    rule: 'Seal',
    allowed: true,
    sealed,
    reason: 'Payload sealed',
  };
}

//
// ─────────────────────────────────────────────────────────────
//   WATCH — Monitoring / Verification
// ─────────────────────────────────────────────────────────────
//

function evalWatch(node, state, glyphs) {
  const target = node.target || 'unknown';

  const exists =
    state.identity[target] !== undefined ||
    state.permissions[target] !== undefined;

  return {
    rule: 'Watch',
    target,
    allowed: exists,
    reason: exists ? 'Target verified' : 'Target not found',
  };
}

//
// ─────────────────────────────────────────────────────────────
//   LOCK — Restriction
// ─────────────────────────────────────────────────────────────
//

function evalLock(node, state, glyphs) {
  const target = node.target || 'default';

  state.updatePermission(target, 'locked');

  return {
    rule: 'Lock',
    target,
    allowed: true,
    reason: 'Target locked',
  };
}

//
// ─────────────────────────────────────────────────────────────
//   TRACE — Audit Trail
// ─────────────────────────────────────────────────────────────
//

function evalTrace(node, state, glyphs) {
  const info = {
    rule: 'Trace',
    glyph: node.glyph || node.rule,
    timestamp: Date.now(),
    context: {
      identity: state.identity,
      permissions: state.permissions,
    },
  };

  state.securityTrace.push(info);

  return {
    rule: 'Trace',
    allowed: true,
    trace: info,
    reason: 'Trace recorded',
  };
}
