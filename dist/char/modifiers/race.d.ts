export declare class Race {
    name: string;
    meta: RaceMeta;
    constructor(name: string);
    setMeta(meta: RaceMeta): Race;
}
export interface RaceMeta {
    background?: string;
    description?: string;
}
