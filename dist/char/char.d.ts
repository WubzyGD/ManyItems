import { Status } from "../status/status";
export declare class Char {
    name: string;
    statuses: Map<string, Status<Char>>;
    constructor(name: string);
    addStatus(status: Status<Char>): Char;
    removeStatus(status: Status<Char>): Char;
}
