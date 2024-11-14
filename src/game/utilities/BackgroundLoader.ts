export default class BackgroundLoader {
    scene: Phaser.Scene;
    imageKey: string;
    centerX: number;
    centerY: number;

    constructor(scene: Phaser.Scene, imageKey: string, centerX: number, centerY: number) {
        this.scene = scene;
        this.imageKey = imageKey;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    loadBackground() {
        this.scene.add.image(this.centerX, this.centerY, this.imageKey)
            .setOrigin(0.5)
            .setDisplaySize(this.scene.cameras.main.width, this.scene.cameras.main.height);
    }
}
