import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import BackgroundLoader from "../utilities/BackgroundLoader";
import { textStyle1 } from "../utilities/TextStyle";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }
    preload(): void {
        this.load.image("bgMenuScene", "assets/images/bgMenuScene.png");
    }
    create(): void {
        const backgroundLoader = new BackgroundLoader(
            this,
            "bgMenuScene",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();

        this.add
            .text(this.cameras.main.centerX, 200, "Bingo", textStyle1)
            .setOrigin(0.5);

        const startButtonDTO = new ButtonDTO(
            "startButton",
            "Start Game",
            this.cameras.main.centerX,
            500,
            () => {
                this.scene.start("SelectDifficulty");
            }
        );
        new Button(this, startButtonDTO);
    }
}
