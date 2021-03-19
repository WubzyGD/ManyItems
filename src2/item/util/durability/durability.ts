import {DurabilityStateError} from "../../../util/errors/durability";
import {DurabilityStateEvents} from "./durabilitystateevents";

export class Durability {
    maxDurability: number;
    canBreak: boolean = true;
    canBecomeIrreparable: boolean = true;
    shatterOnBreak: boolean = false;
    margins: durabilityMargins;

    private _brokenState: durabilityState = "healthy";
    private _durability: number;
    private _stateEvents: DurabilityStateEvents;



    constructor (maxDurability: number, options?: durabilityOptions) {
        if (typeof maxDurability === "number" && maxDurability <= 0) {throw new RangeError("Error in Durability constructor: 'maxDurability' must be a number greater than 0.");}
        this.maxDurability = Math.round(maxDurability);

        if (options) {
            if (typeof options.canBreak === 'boolean') {this.canBreak = options.canBreak;}
            if (options.currentState) {this.state = options.currentState;}
        } else {
            this._durability = this.maxDurability;
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

    private checkDurability(doesThrow?: boolean): Durability {
        return this;
    };


    set state(state: durabilityState) {
        this._brokenState = state;
    };

    set durability(durability: number) {
        this.checkState();
        this._durability = durability;
    };


    get durability(): number {
        return this._durability;
    };

    get state(): durabilityState {
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

    get rawStateEvents(): DurabilityStateEvents {return this._stateEvents;};
}



type durabilityState = "healthy" | "weakened" | "broken" | "irreparable";

interface durabilityMargins {
    healthy?: number,
    weakened?: number,
    broken?: number
}

interface durabilityOptions {
    canBreak?: boolean,
    canBecomeIrreparable?: boolean,
    margins?: durabilityMargins,
    currentDurability?: number,
    currentState?: durabilityState,
    shatterOnBreak?: boolean,
    durabilityStateEvents?: DurabilityStateEvents
}