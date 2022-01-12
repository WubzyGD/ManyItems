import {Status} from "../status/status";

export class Char {

    name: string;
    statuses: Map<string, Status<Char>> = new Map();


    constructor(name: string) {
        this.name = name;
    }



    public addStatus(status: Status<Char>): Char {
        this.statuses.set(status.id, status);
        status.onApply(status, this);
        return this;
    };

    public removeStatus(status: Status<Char>): Char {
        this.statuses.delete(status.id);
        status.onRemove(status, this);
        return this;
    };

}