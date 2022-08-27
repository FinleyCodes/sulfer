import Token from './Token';
import { digits, TT } from '../lib/globals';
import { IllegalCharacterError } from '../lib/errors';
import { promisify } from 'util';

export default class Lexer {
    text: string;
    position: number;
    char?: string | null;
    constructor(text: string) {
        this.text = text;
        this.position = -1;
        this.char = undefined;
        this.advance();
    }
    async advance() {
        if(this.char === null) return;
        if(!this.text) return;
        await this.position++;
        if(this.position < this.text.length) this.char = this.text[this.position];
        else this.char = null;
    }
    async makeTokens() {
        let tokens: object[] = [];
        while(this.char) {
            if(/^\s*$/.test(this.char)) await this.advance()
            else if(digits.includes(this.char)) {
                const madeNumber = await this.makeNumber()
                if(!madeNumber) return;
                await tokens.push(madeNumber)
            }
            else if(this.char === '+') { await tokens.push(await new Token(TT.plus)); await this.advance() }
            else if(this.char === '-') { await tokens.push(await new Token(TT.minus)); await this.advance(); }
            else if(this.char === '*') { await tokens.push(await new Token(TT.mul)); await this.advance(); }
            else if(this.char === '/') { await tokens.push(await new Token(TT.div)); await this.advance(); }
            else if(this.char === '(') { await tokens.push(await new Token(TT.lBracket)); await this.advance(); }
            else if(this.char === ')') { await tokens.push(await new Token(TT.rBracket)); await this.advance(); }
            else throw await new IllegalCharacterError(`Sulfer has detected an unsupported character: ${this.char}`);
        }
        return tokens;
    }
    async makeNumber() {
        let string: string = '';
        let decimal: boolean = false;
        if(!this.char) return;
        while(digits.includes(this.char) || this.char === '.') {
            if(this.char === '.') {
                if(decimal) break;
                decimal = true;
            }
            string += await this.char;
            await this.advance();
        }
        console.log(string)
        if(decimal) return await new Token(TT.float, parseFloat(string));
        return await new Token(TT.int, parseInt(string));
    }
}