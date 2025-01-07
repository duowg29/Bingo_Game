import Phaser from "phaser";
import { ButtonDTO } from "../dto/ButtonDTO";
import Button from "../utilities/Button";
import BackgroundLoader from "../utilities/BackgroundLoader";
import { textStyle1 } from "../utilities/TextStyle";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload(): void {
        this.load.atlas("Button", "assets/Button.png", "assets/Button.json");
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.load.image("WinImage", "assets/images/WinImage.png");
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
            .image(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 100,
                "WinImage"
            )
            .setDisplaySize(400, 300)
            .setOrigin(0.5);

        this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 250,
                "Congratulations!",
                {
                    font: "50px Arial",
                    color: "#FFD700",
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
