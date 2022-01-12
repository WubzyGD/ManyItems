export declare class Effect {
    displayName: string;
    private _id;
    constructor(id: string, displayName?: string);
    setDisplayName(name: string): Effect;
    get id(): string;
}
