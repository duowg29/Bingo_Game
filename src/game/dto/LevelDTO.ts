export class LevelDTO {
    key: string;
    rangeMin: number;
    rangeMax: number;
    duration: number;

    constructor(
        key: string,
        rangeMin: number,
        rangeMax: number,
        duration: number
    ) {
        this.key = key;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.duration = duration;
    }
}
