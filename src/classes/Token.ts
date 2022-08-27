// import { TokenType } from '../lib/globals';

export default class Token {
    type: string;
    value: any;
    represented: string;
    constructor(type: string, value?: any) {
        this.type = type;
        this.value = value;
        this.represented = `${type}${value ? `:${value}` : ''}`;
    }
    async represent() {
        if(this.value) return `${this.type}:${this.value}`;
        return this.type.toString();
    }
}