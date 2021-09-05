export class Race {

    name: string;
    meta: RaceMeta;


    constructor(name: string) {
        this.name = name;
    }



    public setMeta(meta: RaceMeta): Race {
        this.meta = meta;
        return this;
    }

}


export interface RaceMeta {
    background?: string,
    description?: string,
}