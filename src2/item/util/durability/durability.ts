import {DurabilityStateError} from "../../../util/errors/durability";
import {DurabilityStateEvents, StateChangeReturn} from "./durabilitystateevents";

export class Durability {

    maxDurability: number;
    canBreak: boolean = true;
    canBecomeIrreparable: boolean = true;
    shatterOnBreak: boolean = false;
    margins: DurabilityMargins;
    stateEvents: DurabilityStateEvents = new DurabilityStateEvents();
    bypassMarginsOnStateChange: boolean = false;
    disableAutoState: boolean = true;

    private _brokenState: DurabilityState = "healthy";
    private _durability: number;



    constructor (maxDurability: number, options?: DurabilityOptions) {
        if (typeof maxDurability === "number" && maxDurability <= 0) {throw new RangeError("Error in Durability constructor: 'maxDurability' must be a number greater than 0.");}
        this.maxDurability = Math.round(maxDurability);

        if (options) {
            if (typeof options.canBreak === 'boolean') {this.canBreak = options.canBreak;}
            if (typeof options.canShatter === 'boolean') {this.canBecomeIrreparable = options.canShatter;}
            if (options.currentState) {this.state = options.currentState;}
            if (options.currentDurability) {this._durability = this.maxDurability > options.currentDurability ? options.currentDurability : this.maxDurability;}
            if (options.durabilityStateEvents) {this.stateEvents = options.durabilityStateEvents;}
            for (let x of ['bypassMarginOnStateChange', 'disableAutoState', 'margins', 'shatterOnBreak']) {if (options[x]) {this[x] = options[x];}}
        } else {
            this._durability = this.maxDurability;
        }

        if (!options && !options.margins && !options.bypassMarginsOnStateChange) {
            this.margins = {
                healthy: Math.floor(.90 * this.maxDurability), 
                weakened: Math.floor(.40 * this.maxDurability),
                broken: Math.floor(.10 * this.maxDurability)
            };
        }
    }



    public break(noDurabilityChange?: boolean, forceDurability?: number): Durability {
        this.state = 'broken';
        if (!noDurabilityChange) {this.durability = forceDurability || this.margins.broken;}
        return this;
    };

    public heal(noDurabilityChange?: boolean, forceDurability?: number): Durability {
        this.state = 'healthy';
        if (!noDurabilityChange) {this.durability = forceDurability || this.margins.broken;}
        return this;
    };

    public shatter(noDurabilityChange?: boolean, forceDurability?: number): Durability {
        this.state = 'irreparable';
        if (!noDurabilityChange) {this.durability = forceDurability || this.margins.broken;}
        return this;
    };

    public weaken(noDurabilityChange?: boolean, forceDurability?: number): Durability {
        this.state = 'weakened';
        if (!noDurabilityChange) {this.durability = forceDurability || this.margins.broken;}
        return this;
    };

    public setDurability(durability: number): Durability {
        this.durability = durability;
        return this;
    };

    public setMargins(margins: DurabilityMargins): Durability {
        this.margins = margins;
        return this;
    }

    public setStateEvents(stateEvents: DurabilityStateEvents): Durability {
        this.stateEvents = stateEvents;
        return this;
    }

    public setOnStateChange(onStateChange: Function): Durability {
        this.stateEvents.onStateChange = onStateChange;
        return this;
    }


    private checkState(doesThrow?: boolean): Durability {
        if (this.state === "irreparable" && !this.canBecomeIrreparable) {
            if (doesThrow) {throw new DurabilityStateError("This Durability does not support an irreparable state.");}
            this.state = "broken";
        }
        if (this.state === "broken" && !this.canBreak) {
            if (doesThrow) {throw new DurabilityStateError("This Durability does not support a broken state.");}
            this.state = this.shatterOnBreak && this.canBecomeIrreparable ? "irreparable" : "weakened";
        }
        return this;
    };

    private checkDurability(): Durability {
        if (this.margins.healthy < this.durability) {this.heal(false, this.durability);}
        else if (this.margins.healthy >= this.durability) {this.weaken(false, this.durability);}
        else if (this.canBreak && this.margins.weakened >= this.durability) {this.break(false, this.durability);}
        else if (this.canBecomeIrreparable && this.margins.broken >= this.durability) {this.shatter(false, this.durability);}

        return this;
    };

    private handleStateChange(state: DurabilityState): StateChangeReturn {
        return this.stateEvents.onStateChangeWrapper(state, this);
    }


    set state(state: DurabilityState) {
        this._brokenState = state;
        this.handleStateChange(this._brokenState);
    };

    set durability(durability: number) {
        this.checkState();
        if (!this.disableAutoState) {this.checkDurability();}
        this._durability = durability;
    };


    get durability(): number {
        return this._durability;
    };

    get state(): DurabilityState {
        return this._brokenState;
    };

    get isBroken(): boolean {
        return ["broken", "irreparable"].includes(this.state);
    };

    get isHealthy(): boolean {
        return this.state === "healthy";
    };

    get isIrreparable(): boolean {
        return this.state === "irreparable";
    };

    get isShattered(): boolean {return this.isIrreparable;};

    get canShatter(): boolean {return this.canBecomeIrreparable;};



    public static validStates: Array<string> = ['healthy', 'weakened', 'broken', 'irreparable'];
}



export type DurabilityState = "healthy" | "weakened" | "broken" | "irreparable";

interface DurabilityMargins {
    healthy?: number,
    weakened?: number,
    broken?: number
}

interface DurabilityOptions {
    canBreak?: boolean,
    canShatter?: boolean,
    margins?: DurabilityMargins,
    currentDurability?: number,
    currentState?: DurabilityState,
    shatterOnBreak?: boolean,
    durabilityStateEvents?: DurabilityStateEvents,
    bypassMarginsOnStateChange?: boolean,
    disableAutoState?: boolean
}