import Phaser from "phaser";
import BackgroundLoader from "../utilities/BackgroundLoader";

export default class GameScene extends Phaser.Scene {
    private operator: string | null = null;
    private duration: number | null = null;

    constructor() {
        super({ key: "GameScene" });
    }

    init(data: { operator: string; duration: number }): void {
        this.operator = data.operator;
        this.duration = data.duration;

        console.log("GameScene Init Data:", {
            operator: this.operator,
            duration: this.duration,
        });
    }

    preload(): void {
        this.load.atlas(
            "BingoBoard",
            "assets/BingoBoard.png",
            "assets/BingoBoard.json"
        );
    }

    create(): void {
        const backgroundLoader = new BackgroundLoader(
            this,
            "BingoBoard",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();
    }
}
