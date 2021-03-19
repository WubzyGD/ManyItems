export class Item {

    name: string;
    type: string;
    itemOptions: ItemOptions;



    constructor(name: string, type: string, itemOptions?: ItemOptions) {
        this.name = name;
        this.type = type;

        this.itemOptions = itemOptions ? itemOptions : {bounded: {isBounded: false}};
    };



    public setOwner() {}; //TODO all of this rat shit

    public bindTo() {};

    public unBind() {};

}

export interface ItemOptions {
    owner?: string,
    bounded?: {
        isBounded: boolean,
        boundTo?: string
    },
    id?: string
}