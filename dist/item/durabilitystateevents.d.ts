export declare class DurabilityStateEvents {
    enabled: boolean;
    onHealed: Function;
    onWeakened: Function;
    onBroken: Function;
    onShattered: Function;
    onStateChange: Function;
    onStateLock: Function;
    constructor(events: DurabilityEventFunctions, stateEventsEnabled?: boolean);
    toggle(): DurabilityStateEvents;
    enable(): DurabilityStateEvents;
    disable(): DurabilityStateEvents;
}
interface DurabilityEventFunctions {
    onHealed?: Function;
    onWeakened?: Function;
    onBroken?: Function;
    onShattered?: Function;
    onStateChange?: Function;
    onStateLock?: Function;
}
export {};
