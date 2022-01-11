export class ArrayInput<Type> {

    input: Type | Type[];


    constructor(input: Type | Type[]) {
        this.input = input;
    }


    public makeArray(): Type[] {
        return Array.isArray(this.input) ? this.input : [this.input];
    }


    public static makeArray<Type>(input: Type | Type[]): Type[] {
        return Array.isArray(input) ? input : [input];
    }

}