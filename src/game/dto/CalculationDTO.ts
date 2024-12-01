export class CalculationDTO {
    valueA: number;
    valueB: number;
    result: number;
    operator: string[];

    constructor(
        valueA: number,
        valueB: number,
        result: number,
        operator: string[]
    ) {
        this.valueA = valueA;
        this.valueB = valueB;
        this.result = result;
        this.operator = operator;
    }
}
