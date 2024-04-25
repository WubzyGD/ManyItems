import { Feature } from "./features/feature";
export declare class BasicItem {
    name: string;
    description: string;
    private _features;
    private readonly _id;
    constructor(name: string, id: string);
    addFeature(feature: Feature): BasicItem;
    setDescription(description: string): BasicItem;
    get id(): string;
    get features(): Feature[];
}
