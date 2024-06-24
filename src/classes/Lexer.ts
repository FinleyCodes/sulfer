import Token from './Token';
import { digits, TT } from '../lib/globals';
import { IllegalCharacterError } from '../lib/errors';
import Position from './Position';
import { promisify } from 'util';

export default class Lexer {
    text: string;
    position: Position;
    char?: string | null;
    fileName: string | undefined;
    constructor(text: string, fileName?: string) {
        this.text = text;
        this.fileName = fileName;
        this.position = new Position(-1, 0, -1, fileName, text);
        this.char = undefined;
        this.advance();
    }
    async advance() {
        if(this.char === null) return;
        if(!this.text) return;
        await this.position.advance(this.char);
        if(this.position.index < this.text.length) this.char = this.text[this.position.index];
        else this.char = null;
    }
    async makeTokens() {
        let tokens: object[] = [];
        while(this.char) {
            if(/^\s*$/.test(this.char)) await this.advance();
            else if(digits.includes(this.char)) {
                const madeNumber = await this.makeNumber();
                if(!madeNumber) return;
                await tokens.push(madeNumber);
            }
            else if(this.char === '+') { await tokens.push(await new Token(TT.plus)); await this.advance(); }
            else if(this.char === '-') { await tokens.push(await new Token(TT.minus)); await this.advance(); }
            else if(this.char === '*') { await tokens.push(await new Token(TT.mul)); await this.advance(); }
            else if(this.char === '/') { await tokens.push(await new Token(TT.div)); await this.advance(); }
            else if(this.char === '(') { await tokens.push(await new Token(TT.lBracket)); await this.advance(); }
            else if(this.char === ')') { await tokens.push(await new Token(TT.rBracket)); await this.advance(); }
            else {
                const posStart: Promise<Position> = this.position.copy()
                throw await new IllegalCharacterError(`Sulfer has detected an unsupported character: ${this.char}`, posStart, this.position);
            }
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
        if(decimal) return await new Token(TT.float, parseFloat(string));
        return await new Token(TT.int, parseInt(string));
    }
}