import {Char, Effect, Player} from "..";

export class Status<TargetType extends Char> {

    private _id: string;

    displayName: string;
    onApply: (status: Status<TargetType>, target: TargetType) => void = (status: Status<TargetType>, target: TargetType) => {};
    onRemove: (status: Status<TargetType>, target: TargetType) => void = (status: Status<TargetType>, target: TargetType) => {};


    constructor(id: string, displayName?: string, onApply?: (status: Status<TargetType>, target: TargetType) => void) {
        this._id = id;
        this.displayName = displayName || id;
        if (onApply) {this.onApply = onApply;}
    };



    public setDisplayName(name: string): Status<TargetType> {
        this.displayName = name;
        return this;
    };

    public applyTo(target: TargetType): Status<TargetType> {
        target.statuses.set(this.id, this);
        this.onApply(this, target);
        return this;
    };

    public removeFrom(target: TargetType): Status<TargetType> {
        target.statuses.delete(this.id);
        this.onRemove(this, target);
        return this;
    };


    get id(): string {return this._id;};

}

export class PlayerStatus extends Status<Player> {

    constructor(id: string, displayName?: string, onApply?: (status: Status<Player>, target: Player) => void) {
        super(id, displayName, onApply);
    };

}