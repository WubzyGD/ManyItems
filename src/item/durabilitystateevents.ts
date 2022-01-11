export class DurabilityStateEvents {
    enabled: boolean = true;

    onHealed: Function;
    onWeakened: Function;
    onBroken: Function;
    onShattered: Function;
    onStateChange: Function;
    onStateLock: Function;



    constructor (events: DurabilityEventFunctions, stateEventsEnabled?: boolean) {
        let event: string; for (event of Object.keys(events)) {this[event] = events[event];}
        this.enabled = typeof stateEventsEnabled !== "undefined" ? stateEventsEnabled : this.enabled;
    }



    public toggle(): DurabilityStateEvents {
        this.enabled = !this.enabled;
        return this;
    }

    public enable(): DurabilityStateEvents {
        this.enabled = true;
        return this;
    }

    public disable(): DurabilityStateEvents {
        this.enabled = false;
        return this;
    }
}



interface DurabilityEventFunctions {
    onHealed?: Function,
    onWeakened?: Function,
    onBroken?: Function,
    onShattered?: Function,
    onStateChange?: Function,
    onStateLock?: Function,
}