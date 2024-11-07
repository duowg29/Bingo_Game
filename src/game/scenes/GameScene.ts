import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        this.add.text(100, 100, "Game Started!", {
            font: "32px Arial",
            color: "#ffffff",
        });
    }
}
