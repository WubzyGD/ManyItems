import {BasicItem} from "../basicitem";

export class Feature {

    name: string;
    hook: (feature?: Feature, item?: BasicItem) => void | Promise<void> = () => {};
    readonly keyName: string;



    constructor(name: string, keyName: string) {
        this.name = name;
        this.keyName = keyName;
    }



    public applyTo(toApply: BasicItem): Feature {
        toApply[this.keyName] = this;
        this.hook(this, toApply);
        return this;
    }

    public async asyncApplyTo(toApply: BasicItem): Promise<Feature> {
        await this.hook(this, toApply);
        return this;
    }

    public setHook(hook: (feature?: Feature, item?: BasicItem) => void): Feature {
        this.hook = hook;
        return this;
    }

}