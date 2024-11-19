import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import { textStyle1 } from "../utilities/TextStyle";

export default class SelectDifficulty extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create(): void {
        this.add
            .text(
                this.cameras.main.centerX,
                100,
                "Select Difficulty",
                textStyle1
            )
            .setOrigin(0.5);

        const startButtonDTO = new ButtonDTO(
            "startButton",
            "Start Game",
            this.cameras.main.centerX,
            this.cameras.main.centerX,
            () => {
                this.scene.start("GameScene");
            }
        );
    }
}
