export class Dialogue {
    key: string;
    list: string;
    responds: string | Array<string>;
    chooseResponse: Function;
    private uses: string;



    constructor (key: string, list: string, responds: string | Array<string>, chooseResponse?: Function) {
        this.key = key;
        this.list = list;

        if (Array.isArray(responds) && responds.length == 0) {throw new SyntaxError("Error in Dialogue Constructor: Responses is Array of length 0.");}
        this.responds = responds;

        if (chooseResponse) {this.chooseResponse = chooseResponse;}
        else {this.chooseResponse = function (inp: string, resps: string | Array<string>) {
            if (typeof resps == "string" || (Array.isArray(resps) && resps.length == 1)) {return ;}
        };}
    };



    //public select(forceResponse: string): string {

    //};

    //public setResponses(resp: Array<string>): Dialogue {};



}

export class DialogueMenu {
    id: string;
    description: string;
    

}

export class DialogueWithFlow extends DialogueMenu {}

export class DialogueSequence {}

export class DialogueSequenceWithFlow extends DialogueSequence {}