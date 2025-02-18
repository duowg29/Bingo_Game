import Phaser from "phaser";
import { CalculationDTO } from "../dto/CalculationDTO";

export default class CalculationDrawer {
    private scene: Phaser.Scene;
    private calculationText: Phaser.GameObjects.Text | null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.calculationText = null;
    }

    drawCalculation(currentCalculation: CalculationDTO): void {
        const calcText = this.getCalculationText(currentCalculation);

        if (this.calculationText) {
            this.calculationText.setText(calcText);
        } else {
            this.calculationText = this.scene.add
                .text(this.scene.cameras.main.centerX, 150, calcText, {
                    fontSize: "24px",
                    color: "#000",
                    fontStyle: "bold",
                    align: "center",
                })
                .setOrigin(0.5, 0.5);
        }

        this.scene.add
            .image(this.scene.cameras.main.centerX, 150, "CalculationCard")
            .setFrame(0)
            .setDisplaySize(200, 50)
            .setOrigin(0.5, 0.5);
    }
    public getCalculationText(calculation: CalculationDTO): string {
        if (
            Array.isArray(calculation.operator) &&
            calculation.operator.length > 0
        ) {
            const operatorSymbol = this.convertOperatorToSymbol(
                calculation.operator[0]
            );
            return `${calculation.valueA} ${operatorSymbol} ${calculation.valueB} = ?`;
        } else {
            console.error("Operator is missing or invalid");
            return `${calculation.valueA} ? ${calculation.valueB} = ?`; // Giá trị mặc định khi không có operator
        }
    }
    public convertOperatorToSymbol(operator: string): string {
        switch (operator) {
            case "Addition":
                return "+";
            case "Subtraction":
                return "-";
            case "Multiplication":
                return "*";
            case "Division":
                return "/";
            default:
                return "";
        }
    }
}
