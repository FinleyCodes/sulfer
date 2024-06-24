//

export default class Position {
    index: number;
    line: number;
    column: number;
    fileName: string | undefined;
    fileText: string | undefined;
    constructor(index: number, line: number, column: number, fileName?: string, fileText?: string) {
        this.index = index;
        this.line = line;
        this.column = column;
        this.fileName = fileName;
        this.fileText = fileText;
    }
    async advance(char?: string) {
        this.index++;
        this.column++;
        if(char == '\n' || char == '\r\n' || char == ';') {
            this.line++;
            this.column = 0;
        }
        return this;
    }
    async copy() {
        return new Position(this.index, this.line, this.column, this.fileName, this.fileText);
    }
}