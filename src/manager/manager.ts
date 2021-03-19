import {Random} from "..";

export class Manager {

    minSize: number = null;
    maxSize: number = null;
    duplicateIDsAllowed: boolean = true;
    throwOnBadFetch: boolean = true;
    throwOnNullFetch: boolean = false;
    throwOnThresholdPass: boolean = false;

    protected contents: Map<string, any>;
    protected managerType: string;



    constructor(options?: ManagerOptions) {
        this.contents = new Map();

        if (options) {
            if (options.size) {
                if (!(options.size.max && options.size.min)) {throw new SyntaxError("Error in Manager constructor: options.size was not given both a maximum and a minimum");}
                if (typeof options.size.min !== "number" || typeof options.size.max !== "number") {throw new SyntaxError("Error in Manager constructor: options.size members must be numbers, and one of them was of another type.");}
                if (options.size.max < options.size.min) {throw new SyntaxError("Error in Manager constructor: options.size.max is less than options.size.min.");}
                if (options.size.min < 0) {throw new SyntaxError("Error in Manager constructor: options.size.min is negative.");}

                this.minSize = options.size.min;
                this.maxSize = options.size.max;
            }

            ['duplicateIDsAllowed', 'throwOnBadFetch', 'throwOnNullFetch', 'throwOnThresholdPass'].forEach(x => {if (Object.keys(options).includes(x) && typeof options[x] === "boolean") {this[x] = options[x];}});
        }
        this.managerType = "Manager";
    };



    public fetchOne(condition: Function): any {
        let match = [];
        Array.from(this.contents.values()).forEach(key => {
            if (condition(key, this.contents.get(key))) {match.push = this.contents.get(key);}
        });

        return match;
    };

    public fetch(condition: Function): Array<any> {
        let matches = [];
        Array.from(this.contents.values()).forEach(key => {
            if (condition(key, this.contents.get(key))) {matches.push(this.contents.get(key));}
        });

        return matches;
    };

    public fetchRandom(count?: number, condition?: Function): any | Array<any> {
        return this.contents.get(Array.from(this.contents.values())[Random.calc_bubble({min: 0, max: this.contents.size - 1})]);
    };

    public fetchAll(): Array<any> {
        return Array.from(this.contents.values());
    };

    public add(id: string, value: any): Manager {
        this.contents.set(id, value);

        return this;
    };

    public clear(condition: Function): Manager {
        Array.from(this.contents.keys()).forEach(key => {
            if (condition(key, this.contents.get(key))) {this.contents.delete(key);}
        });

        return this;
    };

    public clearAll(): Manager {
        this.contents = new Map<string, any>();

        return this;
    };

}

export interface ManagerOptions {
    size: {
        min: number,
        max: number
    },
    duplicateIDsAllowed: boolean,
    throwOnBadFetch: boolean,
    throwOnNullFetch: boolean,
    throwOnThresholdPass: boolean
}