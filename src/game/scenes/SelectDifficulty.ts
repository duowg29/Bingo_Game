import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import { DurationData } from "../data/DurationData";
import BackgroundLoader from "../utilities/BackgroundLoader";
import SoundManager from "../utilities/SoundManager";

export default class SelectDifficulty extends Phaser.Scene {
    private selectedOperator: string | null = null;
    private selectedDuration: number | null = null;
    private operatorBoxes: Phaser.GameObjects.Rectangle[] = [];
    private operatorFills: Phaser.GameObjects.Rectangle[] = [];
    private durationBoxes: Phaser.GameObjects.Rectangle[] = [];
    private durationFills: Phaser.GameObjects.Rectangle[] = [];
    public soundManager: SoundManager | null = null;

    constructor() {
        super({ key: "SelectDifficulty" });
    }

    preload(): void {
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.load.image("TeacherImage", "assets/images/TeacherImage.png");
        this.soundManager = new SoundManager(this, ["BackgroundMusic"]);
        this.soundManager.preload();
    }

    create(): void {
        if (this.soundManager) {
            this.soundManager.play("BackgroundMusic", true);
        }
        this.selectedOperator = null;
        this.selectedDuration = null;
        this.operatorBoxes = [];
        this.operatorFills = [];
        this.durationBoxes = [];
        this.durationFills = [];

        const backgroundLoader = new BackgroundLoader(
            this,
            "whiteBg",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();

        const titleText = this.add
            .text(
                this.scale.width / 2,
                this.scale.height * 0.2,
                "Select Difficulty",
                {
                    font: "60px Arial",
                    color: "#000000",
                }
            )
            .setOrigin(0.5);

        const teacherImage = this.add
            .image(
                this.scale.width / 1.5,
                this.scale.height * 0.4,
                "TeacherImage"
            )
            .setDisplaySize(this.scale.width * 0.3, this.scale.height * 0.3)
            .setOrigin(0.5, 0.5);

        const operatorText = this.add
            .text(
                this.scale.width * 0.2,
                this.scale.height * 0.4,
                "Operator?",
                {
                    font: "30px Arial",
                    color: "#000000",
                }
            )
            .setOrigin(0);

        const operators = [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
        ];
        operators.forEach((operator, index) => {
            const { box, fill } = this.createCheckBox(
                this.scale.width * 0.2,
                this.scale.height * 0.46 + index * 30,
                operator,
                () => this.selectOperator(operator, index)
            );
            this.operatorBoxes.push(box);
            this.operatorFills.push(fill);

            if (index === 0) {
                fill.setVisible(true);
                this.selectedOperator = operator;
            }
        });

        const difficultyText = this.add
            .text(
                this.scale.width * 0.2,
                this.scale.height * 0.6,
                "Difficulty",
                {
                    font: "30px Arial",
                    color: "#000000",
                }
            )
            .setOrigin(0);

        DurationData.forEach((difficulty, index) => {
            const { box, fill } = this.createCheckBox(
                this.scale.width * 0.2,
                this.scale.height * 0.66 + index * 30,
                difficulty.key,
                () => this.selectDuration(difficulty.duration, index)
            );
            this.durationBoxes.push(box);
            this.durationFills.push(fill);

            if (index === 0) {
                fill.setVisible(true);
                this.selectedDuration = difficulty.duration;
            }
        });

        const startButtonDTO = new ButtonDTO(
            "startButton",
            "Start",
            this.scale.width / 1.4,
            this.scale.height * 0.65,
            this.scale.width * 0.2,
            this.scale.height * 0.1,
            this.startGame.bind(this),
            "Button2"
        );

        new Button(this, startButtonDTO);

        this.scale.on("resize", this.resize, this);
    }

    resize(gameSize: Phaser.Structs.Size): void {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

        // Cập nhật vị trí của các thành phần
        this.children.list.forEach((child) => {
            if (child instanceof Phaser.GameObjects.Text) {
            } else if (child instanceof Phaser.GameObjects.Image) {
            } else if (child instanceof Phaser.GameObjects.Rectangle) {
            }
        });
    }

    private createCheckBox(
        x: number,
        y: number,
        label: string,
        onClick: () => void
    ): {
        box: Phaser.GameObjects.Rectangle;
        fill: Phaser.GameObjects.Rectangle;
        text: Phaser.GameObjects.Text;
    } {
        const box = this.add
            .rectangle(x, y, 20, 20)
            .setStrokeStyle(2, 0x000000)
            .setInteractive();

        const fill = this.add
            .rectangle(x, y, 15, 15, 0x000000)
            .setVisible(false);

        const text = this.add
            .text(x + 30, y - 10, label, {
                font: "20px Arial",
                color: "#000000",
            })
            .setInteractive();

        box.on("pointerdown", onClick);
        text.on("pointerdown", onClick);

        const setHoverCursor = (item: Phaser.GameObjects.GameObject) => {
            item.on("pointerover", () => {
                this.input.setDefaultCursor("pointer");
            });
            item.on("pointerout", () => {
                this.input.setDefaultCursor("default");
            });
        };

        setHoverCursor(box);
        setHoverCursor(text);

        return { box, fill, text };
    }

    private deselectAll(fills: Phaser.GameObjects.Rectangle[]): void {
        fills.forEach((fill) => fill.setVisible(false));
    }

    private selectOperator(operator: string, index: number): void {
        if (this.selectedOperator === operator) {
            return;
        }

        this.deselectAll(this.operatorFills);
        this.operatorFills[index].setVisible(true);
        this.selectedOperator = operator;
    }

    private selectDuration(duration: number, index: number): void {
        if (this.selectedDuration === duration) {
            return;
        }

        this.deselectAll(this.durationFills);
        this.durationFills[index].setVisible(true);
        this.selectedDuration = duration;
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
