import { type } from 'os';
import log from './lib/log';
import Token from './classes/Token';
import Lexer from './classes/Lexer';
import * as globals from './lib/globals';

export default async function main(text: string) {

    let lexer: Lexer | null = await new Lexer(text);
    let tokens = await lexer.makeTokens();
    lexer = await null;
    return tokens;

}

main('');