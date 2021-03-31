import { DurabilityStateChangeWrapperError } from "../../../util/errors/durability";
import { Durability, DurabilityState } from "./durability";

export class DurabilityStateEvents {

    enabled: boolean = true;

    onHealed: Function;
    onWeakened: Function;
    onBroken: Function;
    onShattered: Function;
    onStateLock: Function;
    onStateChange: Function;
    stateChangeTriggersSubfunction: boolean = true;

    public readonly onStateChangeWrapper: Function = (state: DurabilityState, durability: Durability): StateChangeReturn => {
        if (this.stateChangeTriggersSubfunction) {
            if (!Durability.validStates.includes(state)) {throw new DurabilityStateChangeWrapperError("Param 'state' was not a valid state type.");}
            if (!(durability instanceof Durability)) {throw new DurabilityStateChangeWrapperError("Param 'durability' was not a Durability instance.");}

            if (state === 'healthy') {return {specific: this.onHealed(state, durability), general: this.onStateChange(state, durability)};}
            if (state === 'broken') {return {specific: this.onWeakened(state, durability), general: this.onStateChange(state, durability)};}
            if (state === 'weakened') {return {specific: this.onBroken(state, durability), general: this.onStateChange(state, durability)};}
            if (state === 'irreparable') {return {specific: this.onShattered(state, durability), general: this.onStateChange(state, durability)};}
        }

        return this.onStateChange(state, durability);
    };



    constructor (events?: DurabilityEventFunctions, stateEventsEnabled?: boolean) {
        if (events) {let event: string; for (event of Object.keys(events)) {this[event] = events[event];}}
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


    set events(events: DurabilityEventFunctions) {
        if (events) {let event: string; for (event of Object.keys(events)) {this[event] = events[event];}}
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

export interface StateChangeReturn {
    general: any,
    specific: any
}