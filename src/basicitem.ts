import {Feature} from "./features/feature";

export class BasicItem {

    name: string;
    description: string;
    
    private _features: Feature[] = [];
    private readonly _id: string;



    constructor(name: string, id: string) {
        this.name = name;
        this._id = id;
    }



    public addFeature(feature: Feature): BasicItem {
        feature.applyTo(this);
        return this;
    }

    public setDescription(description: string): BasicItem {
        this.description = description;
        return this;
    }


    get id(): string {return this._id;}

    get features(): Feature[] {return this._features;}

    //get enabledFeatures(): string[] {} //TODO

}