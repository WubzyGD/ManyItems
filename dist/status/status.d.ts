import { Char, Player } from "..";
export declare class Status<TargetType extends Char> {
    private _id;
    displayName: string;
    onApply: (status: Status<TargetType>, target: TargetType) => void;
    onRemove: (status: Status<TargetType>, target: TargetType) => void;
    constructor(id: string, displayName?: string, onApply?: (status: Status<TargetType>, target: TargetType) => void);
    setDisplayName(name: string): Status<TargetType>;
    applyTo(target: TargetType): Status<TargetType>;
    removeFrom(target: TargetType): Status<TargetType>;
    get id(): string;
}
export declare class PlayerStatus extends Status<Player> {
    constructor(id: string, displayName?: string, onApply?: (status: Status<Player>, target: Player) => void);
}
