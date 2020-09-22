export declare class Dialogue {
    key: string;
    list: string;
    responds: string | Array<string>;
    chooseResponse: Function;
    private uses;
    constructor(key: string, list: string, responds: string | Array<string>, chooseResponse?: Function);
}
export declare class DialogueMenu {
    id: string;
    description: string;
}
export declare class DialogueWithFlow extends DialogueMenu {
}
export declare class DialogueSequence {
}
export declare class DialogueSequenceWithFlow extends DialogueSequence {
}
