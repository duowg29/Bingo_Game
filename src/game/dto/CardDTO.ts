export class CardDTO {
    key: string;
    number: number;
    width: number;
    height: number;
    marked: boolean;

    constructor(
        key: string,
        number: number,
        width: number,
        height: number,
        marked: boolean
    ) {
        this.key = key;
        this.number = number;
        this.width = width;
        this.height = height;
        this.marked = marked;
    }
}
