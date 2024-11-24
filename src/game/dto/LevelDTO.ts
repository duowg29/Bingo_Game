export class LevelDTO {
    key: string;
    rangeMin: number;
    rangeMax: number;
    operators: string[];
    duration: number;

    constructor(
        key: string,
        rangeMin: number,
        rangeMax: number,
        operators: string[],
        duration: number
    ) {
        this.key = key;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.duration = duration;
        this.operators = operators;
    }
}
