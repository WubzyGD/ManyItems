import { BasicItem } from "../basicitem";
export declare class Feature {
    name: string;
    hook: (feature?: Feature, item?: BasicItem) => void | Promise<void>;
    readonly keyName: string;
    constructor(name: string, keyName: string);
    applyTo(toApply: BasicItem): Feature;
    asyncApplyTo(toApply: BasicItem): Promise<Feature>;
    setHook(hook: (feature?: Feature, item?: BasicItem) => void): Feature;
}
