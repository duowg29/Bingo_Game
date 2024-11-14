import Phaser from "phaser";
import BackgroundLoader from "../utilities/BackgroundLoader";

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
    }
}
