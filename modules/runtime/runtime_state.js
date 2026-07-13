// modules/runtime/runtime_state.js
// LinKod Runtime State
// Holds execution context, identity, permissions, variables, logs, and security decisions.

export class RuntimeState {
  constructor(initialContext = {}) {
    // Identity context (Mark, Origin, Lineage, etc.)
    this.identity = initialContext.identity || {};

    // Permissions context (Gate, Lock, Seal, etc.)
    this.permissions = initialContext.permissions || {};

    // Variables created during execution
    this.variables = {};

    // Execution stack (for nested expressions)
    this.stack = [];

    // Logs for debugging or symbolic tracing
    this.logs = [];

    // Security decisions recorded during execution
    this.securityTrace = [];

    // Optional environment (external system hooks)
    this.environment = initialContext.environment || {};
  }

  /**
   * Set a variable in the runtime context.
   */
  setVar(name, value) {
    this.variables[name] = value;
    this._log(`Set variable "${name}" = ${JSON.stringify(value)}`);
  }

  /**
   * Get a variable from the runtime context.
   */
  getVar(name) {
    return this.variables[name];
  }

  /**
   * Push a frame onto the execution stack.
   */
  pushFrame(frame) {
    this.stack.push(frame);
    this._log(`Pushed frame: ${JSON.stringify(frame)}`);
  }

  /**
   * Pop a frame from the execution stack.
   */
  popFrame() {
    const frame = this.stack.pop();
    this._log(`Popped frame: ${JSON.stringify(frame)}`);
    return frame;
  }

  /**
   * Record a security decision (Gate, Mark, Seal, Watch, Lock, Trace).
   */
  logSecurityDecision(node, decision) {
    const entry = {
      glyph: node.glyph || node.rule || 'unknown',
      decision,
      timestamp: Date.now(),
    };

    this.securityTrace.push(entry);
    this._log(`Security decision: ${JSON.stringify(entry)}`);
  }

  /**
   * Update identity context (Mark, Origin, Lineage, etc.)
   */
  updateIdentity(key, value) {
    this.identity[key] = value;
    this._log(`Identity updated: ${key} = ${JSON.stringify(value)}`);
  }

  /**
   * Update permissions context (Gate, Lock, Seal, etc.)
   */
  updatePermission(key, value) {
    this.permissions[key] = value;
    this._log(`Permission updated: ${key} = ${JSON.stringify(value)}`);
  }

  /**
   * Log internal runtime events.
   */
  _log(message) {
    this.logs.push({
      message,
      timestamp: Date.now(),
    });
  }

  /**
   * Export the full runtime snapshot.
   */
  snapshot() {
    return {
      identity: this.identity,
      permissions: this.permissions,
      variables: this.variables,
      stack: this.stack,
      logs: this.logs,
      securityTrace: this.securityTrace,
      environment: this.environment,
    };
  }
}
