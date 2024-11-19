export class RangeDTO {
    key: string;
    minValue: number;
    maxValue: number;

    constructor(key: string, minValue: number, maxValue: number) {
        this.key = key;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}
