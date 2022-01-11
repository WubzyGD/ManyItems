"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurabilityStateEvents = void 0;
class DurabilityStateEvents {
    constructor(events, stateEventsEnabled) {
        this.enabled = true;
        let event;
        for (event of Object.keys(events)) {
            this[event] = events[event];
        }
        this.enabled = typeof stateEventsEnabled !== "undefined" ? stateEventsEnabled : this.enabled;
    }
    toggle() {
        this.enabled = !this.enabled;
        return this;
    }
    enable() {
        this.enabled = true;
        return this;
    }
    disable() {
        this.enabled = false;
        return this;
    }
}
exports.DurabilityStateEvents = DurabilityStateEvents;
