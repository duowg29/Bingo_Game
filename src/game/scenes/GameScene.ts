import Phaser from "phaser";
import { LevelDTO } from "../dto/LevelDTO";
export default class GameScene extends Phaser.Scene {
    private operator: string | null = null;
    private duration: number | null = null;

    constructor() {
        super({ key: "GameScene" });
    }

    init(data: { level: LevelDTO }): void {
        const levelData = data.level;
        this.operator = levelData.operators[0];
        this.duration = levelData.duration;
    }

    preload(): void {}

    create(): void {
        this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 100,
                "Game Started!",
                {
                    font: "32px Arial",
                    color: "#FFFFFF",
                }
            )
            .setOrigin(0.5);

        if (this.operator) {
            this.add
                .text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    `Operator: ${this.operator}`,
                    {
                        font: "24px Arial",
                        color: "#FFFFFF",
                    }
                )
                .setOrigin(0.5);
        }

        if (this.duration) {
            this.add
                .text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY + 50,
                    `Duration: ${this.duration} seconds`,
                    {
                        font: "24px Arial",
                        color: "#FFFFFF",
                    }
                )
                .setOrigin(0.5);
        }

        const restartButton = this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY + 150,
                "Restart",
                {
                    font: "24px Arial",
                    color: "#FF0000",
                }
            )
            .setOrigin(0.5)
            .setInteractive();

        restartButton.on("pointerdown", () => {
            this.scene.start("SelectDifficulty");
        });
    }
}
