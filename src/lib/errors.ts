export class IllegalCharacterError extends Error {
    constructor(err: string) {
        super();
        this.name = 'SulferBadCharacterError';
        this.message = err;
    }
}