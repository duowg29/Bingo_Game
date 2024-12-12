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
        this.load.atlas("Button", "assets/Button.png", "assets/Button.json");
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.load.image("BingoImage", "assets/images/BingoImage.png");
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
            .image(this.cameras.main.centerX, 300, "BingoImage")
            .setFrame(0)
            .setDisplaySize(600, 500)
            .setOrigin(0.5, 0.5);

        const startButton = new ButtonDTO(
            "startButton",
            "Start Game",
            this.cameras.main.centerX,
            600,
            200,
            300,
            () => {
                // this.scene.start("EndScene");
                this.scene.start("SelectDifficulty");
            },
            "Button2"
        );
        new Button(this, startButton);
    }
}
