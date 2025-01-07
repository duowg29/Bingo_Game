import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import { DurationData } from "../data/DurationData";
import BackgroundLoader from "../utilities/BackgroundLoader";

export default class SelectDifficulty extends Phaser.Scene {
    private selectedOperator: string | null = null;
    private selectedDuration: number | null = null;
    private operatorBoxes: Phaser.GameObjects.Rectangle[] = [];
    private operatorFills: Phaser.GameObjects.Rectangle[] = [];
    private durationBoxes: Phaser.GameObjects.Rectangle[] = [];
    private durationFills: Phaser.GameObjects.Rectangle[] = [];

    constructor() {
        super({ key: "SelectDifficulty" });
    }

    preload(): void {
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.load.image("TeacherImage", "assets/images/TeacherImage.png");
    }

    create(): void {
        const backgroundLoader = new BackgroundLoader(
            this,
            "whiteBg",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();

        this.add
            .text(
                this.cameras.main.centerX - 200,
                this.cameras.main.centerY - 300,
                "Select Difficulty",
                {
                    font: "60px Arial",
                    color: "#000000",
                }
            )
            .setOrigin(0);
        this.add
            .image(500, 400, "TeacherImage")
            .setDisplaySize(300, 300)
            .setOrigin(0.5, 0.5);

        this.add
            .text(100, 260, "Operator?", {
                font: "30px Arial",
                color: "#000000",
            })
            .setOrigin(0);

        const operators = [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
        ];
        operators.forEach((operator, index) => {
            const { box, fill } = this.createCheckBox(
                100,
                100 + index * 30,
                operator,
                () => this.selectOperator(operator, index)
            );
            this.operatorBoxes.push(box);
            this.operatorFills.push(fill);
        });

        this.add
            .text(100, 450, "Difficulty", {
                font: "30px Arial",
                color: "#000000",
            })
            .setOrigin(0);

        DurationData.forEach((difficulty, index) => {
            const { box, fill } = this.createCheckBox(
                100,
                300 + index * 30,
                difficulty.key,
                () => this.selectDuration(difficulty.duration, index)
            );
            this.durationBoxes.push(box);
            this.durationFills.push(fill);
        });

        const startButtonDTO = new ButtonDTO(
            "startButton",
            "Start",
            550,
            600,
            200,
            300,
            this.startGame.bind(this),
            "Button2"
        );

        new Button(this, startButtonDTO);
    }

    private createCheckBox(
        x: number,
        y: number,
        label: string,
        onClick: () => void
    ): {
        box: Phaser.GameObjects.Rectangle;
        fill: Phaser.GameObjects.Rectangle;
    } {
        const box = this.add
            .rectangle(x, y + 210, 20, 20)
            .setStrokeStyle(2, 0x000000)
            .setInteractive();

        const fill = this.add
            .rectangle(x, y + 210, 15, 15, 0x000000)
            .setVisible(false);

        this.add.text(x + 30, y + 195, label, {
            font: "20px Arial",
            color: "#000000",
        });

        box.on("pointerdown", () => {
            onClick();
        });

        return { box, fill };
    }

    private deselectAll(fills: Phaser.GameObjects.Rectangle[]): void {
        fills.forEach((fill) => fill.setVisible(false));
    }

    private selectOperator(operator: string, index: number): void {
        if (this.selectedOperator === operator) {
            this.deselectAll(this.operatorFills);
            this.selectedOperator = null;
        } else {
            this.deselectAll(this.operatorFills);
            this.operatorFills[index].setVisible(true);
            this.selectedOperator = operator;
        }
    }

    private selectDuration(duration: number, index: number): void {
        if (this.selectedDuration === duration) {
            this.deselectAll(this.durationFills);
            this.selectedDuration = null;
        } else {
            this.deselectAll(this.durationFills);
            this.durationFills[index].setVisible(true);
            this.selectedDuration = duration;
        }
    }

    private startGame(): void {
        if (this.selectedOperator === null || this.selectedDuration === null) {
            alert("Please select one operator and one difficulty level.");
            return;
        }
        console.log("Selected operator:", this.selectedOperator);
        console.log("Selected duration:", this.selectedDuration);
        this.scene.start("GameScene", {
            operator: this.selectedOperator,
            duration: this.selectedDuration,
        });
    }
}
