export declare class ArrayInput<Type> {
    input: Type | Type[];
    constructor(input: Type | Type[]);
    makeArray(): Type[];
    static makeArray<Type>(input: Type | Type[]): Type[];
}
