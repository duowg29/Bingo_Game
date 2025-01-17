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
            .image(this.scale.width / 2, this.scale.height * 0.3, "BingoImage")
            .setFrame(0)
            .setDisplaySize(this.scale.width * 0.75, this.scale.height * 0.5)
            .setOrigin(0.5, 0.5);

        const startButton = new ButtonDTO(
            "startButton",
            "Start Game",
            this.scale.width / 2,
            this.scale.height * 0.7,
            this.scale.width / 2,
            this.scale.height * 0.7,
            () => {
                this.scene.start("SelectDifficulty");
            },
            "Button2"
        );
        new Button(this, startButton);
        this.scale.on("resize", this.resize, this);
    }
    resize(gameSize: Phaser.Structs.Size): void {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
    }
}
