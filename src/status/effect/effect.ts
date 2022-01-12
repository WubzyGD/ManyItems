export class Effect {
    
    displayName: string;

    private _id: string;


    constructor(id: string, displayName?: string) {
        this._id = id;
        this.displayName = displayName || id;
    }



    public setDisplayName(name: string): Effect {
        this.displayName = name;
        return this;
    };


    get id(): string {return this._id;};

}