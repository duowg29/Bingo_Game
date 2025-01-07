import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import BackgroundLoader from "../utilities/BackgroundLoader";
import { textStyle1 } from "../utilities/TextStyle";

export default class LostScene extends Phaser.Scene {
    constructor() {
        super({ key: "LostScene" });
    }

    preload(): void {
        this.load.atlas("Button", "assets/Button.png", "assets/Button.json");
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.load.image("LostImage", "assets/images/LostImage.png");
    }

    create(): void {
        const backgroundLoader = new BackgroundLoader(
            this,
            "whiteBg",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();

        const lostImage = this.add
            .image(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 100,
                "LostImage"
            )
            .setDisplaySize(300, 300)
            .setOrigin(0.5);

        this.tweens.add({
            targets: lostImage,
            y: lostImage.y + 10,
            duration: 500,
            yoyo: true,
            repeat: -1,
        });

        this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 250,
                "Game Over!",
                {
                    font: "50px Arial",
                    color: "#FF0000",
                    fontStyle: "bold",
                }
            )
            .setOrigin(0.5);

        const returnButtonDTO = new ButtonDTO(
            "returnButton",
            "Return",
            this.cameras.main.centerX,
            this.cameras.main.centerY + 200,
            300,
            80,
            () => {
                window.location.reload();
                // this.scene.start("SelectDifficulty");
            },
            "Button2"
        );

        new Button(this, returnButtonDTO);
    }
}
