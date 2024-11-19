export class CalculationDTO {
    key: string;
    valueA: number;
    valueB: number;
    result: number;
    operator: string[];

    constructor(
        key: string,
        valueA: number,
        valueB: number,
        result: number,
        operator: string[]
    ) {
        this.key = key;
        this.valueA = valueA;
        this.valueB = valueB;
        this.result = result;
        this.operator = operator;
    }
}
