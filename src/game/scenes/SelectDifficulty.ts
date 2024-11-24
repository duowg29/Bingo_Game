import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import { LevelDTO } from "../dto/LevelDTO";
import { textStyle1 } from "../utilities/TextStyle";

export default class SelectDifficulty extends Phaser.Scene {
    private selectedOperator: string | null = null;
    private selectedDuration: number | null = null;
    private operatorBoxes: Phaser.GameObjects.Rectangle[] = [];
    private durationBoxes: Phaser.GameObjects.Rectangle[] = [];

    constructor() {
        super({ key: "SelectDifficulty" });
    }
    preload(): void {}

    create(): void {
        this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 300,
                "Select Difficulty",
                textStyle1
            )
            .setOrigin(0.5);
        this.add
            .text(100, 260, "What kind?", {
                font: "24px Arial",
                color: "#FFFFFF",
            })
            .setOrigin(0);

        const operators = [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
        ];
        operators.forEach((operator, index) => {
            const box = this.createCheckBox(
                100,
                100 + index * 30,
                operator,
                () => this.selectOperator(operator, index)
            );
            this.operatorBoxes.push(box);
        });
        const difficulties = [
            { label: "Medium", duration: 30 },
            { label: "Fast", duration: 20 },
            { label: "Faster", duration: 15 },
            { label: "Fastest", duration: 10 },
        ];

        difficulties.forEach((difficulty, index) => {
            const box = this.createCheckBox(
                100,
                300 + index * 30,
                difficulty.label,
                () => this.selectDuration(difficulty.duration, index)
            );
            this.durationBoxes.push(box);
        });

        this.add
            .text(100, 450, "How Fast?", {
                font: "24px Arial",
                color: "#FFFFFF",
            })
            .setOrigin(0);

        const startButtonDTO = new ButtonDTO(
            "startButton",
            "Start",
            400,
            400,
            this.startGame.bind(this)
        );
        new Button(this, startButtonDTO);
    }

    private createCheckBox(
        x: number,
        y: number,
        label: string,
        onClick: () => void
    ): Phaser.GameObjects.Rectangle {
        const box = this.add
            .rectangle(x, y + 200, 20, 20, 0x000000)
            .setInteractive();
        const text = this.add.text(x + 30, y - 10 + 200, label, {
            font: "20px Arial",
            color: "#FFFFFF",
        });

        box.on("pointerdown", () => {
            onClick();
        });

        return box;
    }
    private selectOperator(operator: string, index: number): void {
        if (this.selectedOperator === operator) {
            this.operatorBoxes[index].setFillStyle(0x000000);
            this.selectedOperator = null;
        } else {
            this.operatorBoxes.forEach((box) => box.setFillStyle(0x000000));
            this.operatorBoxes[index].setFillStyle(0x00ff00);
            this.selectedOperator = operator;
        }
    }
    private selectDuration(duration: number, index: number): void {
        if (this.selectedDuration === duration) {
            this.durationBoxes[index].setFillStyle(0x000000);
            this.selectedDuration = null;
        } else {
            this.durationBoxes.forEach((box) => box.setFillStyle(0x000000));
            this.durationBoxes[index].setFillStyle(0x00ff00);
            this.selectedDuration = duration;
        }
    }
    private startGame(): void {
        if (this.selectedOperator === null || this.selectedDuration === null) {
            alert("Please select one operator and one difficulty level.");
            return;
        }

        const level = new LevelDTO(
            "level1",
            1,
            100,
            [this.selectedOperator],
            this.selectedDuration
        );

        this.scene.start("GameScene", { level });
    }
}
