import Phaser from "phaser";
import { EventBus } from '../EventBus';

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");
	}

	create() {
		// background
		const background = this.add.image(512, 384, "background");
		background.alpha = 0.5;
		background.alphaTopLeft = 0.5;
		background.alphaTopRight = 0.5;
		background.alphaBottomLeft = 0.5;
		background.alphaBottomRight = 0.5;

		// textgameover
		const textgameover = this.add.text(512, 384, "", {});
		textgameover.setOrigin(0.5, 0.5);
		textgameover.text = "Game Over";
		textgameover.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Arial Black", "fontSize": "64px", "stroke": "#000000", "strokeThickness":8});

		this.events.emit("scene-awake");

        this.cameras.main.setBackgroundColor(0xff0000);

        EventBus.emit('current-scene-ready', this);
	}
}
