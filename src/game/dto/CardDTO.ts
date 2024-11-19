export class CardDTO {
    key: string;
    number: number;
    marked: boolean;

    constructor(key: string, number: number, marked: boolean) {
        this.key = key;
        this.number = number;
        this.marked = marked;
    }
}
