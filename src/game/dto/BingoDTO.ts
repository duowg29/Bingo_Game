export class BingoDTO {
    key: string;
    cols: number;
    rows: number;
    operator: string[];

    constructor(key: string, cols: number, rows: number, operator: string[]) {
        this.key = key;
        this.cols = cols;
        this.rows = rows;
        this.operator = operator;
    }
}
