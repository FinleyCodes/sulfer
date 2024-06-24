import Position from '../classes/Position';
import chalk from 'chalk';

export class IllegalCharacterError extends Error {
    constructor(err: string, posStart?: Promise<Position>, posEnd?: Position) {
        super();
        (async () => {
            const position = await posStart;
            const ln: any = position?.line;
            this.name = await chalk.bold.red('SulferBadCharacterError');
            this.message = await chalk.red(`\nFile ${position?.fileName}, line ${ln + 1}\n${err}`);
        })()
    }
}