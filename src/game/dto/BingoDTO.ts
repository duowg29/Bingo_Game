export class BingoDTO {
    key: string;
    cols: number;
    rows: number;
    resultList: number[];

    constructor(key: string, cols: number, rows: number, resultList: number[]) {
        this.key = key;
        this.cols = cols;
        this.rows = rows;
        this.resultList = resultList;
    }
}
