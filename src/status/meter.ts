export class Meter {

    name: string;
    tracks: string;
    supports: {float: boolean, negative: boolean} = {float: false, negative: false};

    private _onUpdate: (meter: Meter) => any = () => {};
    private _val: number;


    constructor(name: string, options: MeterOptions) {
        this.name = name;
        if (options) {
            if (options.tracks) {this.tracks = options.tracks;}
            if (options.supports) {['float', 'negative'].forEach(s => {if (typeof s !== "undefined") {this.supports[s] = s;}})}
            if (options.onUpdate) {this._onUpdate = options.onUpdate;}
        }
    }



    public setUpdateEvent(updateEvent): Meter {
        this.updateEvent = updateEvent;
        return this;
    }

    public setValue(val: number): Meter {
        this.value = val;
        return this;
    }


    set updateEvent(updateEvent) {this._onUpdate = updateEvent;}

    set value(val: number) {
        let oldm = this;
        if (!this.supports.negative && val < 0) {val = 0;}
        this._val = this.supports.float ? val : Math.round(val);
    }


    get value(): number {return this._val;}

}

interface MeterOptions {
    tracks?: string,
    supports?: {float?: boolean, negative?: boolean},
    onUpdate?: (meter: Meter) => any
}