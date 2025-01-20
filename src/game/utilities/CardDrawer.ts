import Phaser from "phaser";
import { CardDTO } from "../dto/CardDTO";
import GameScene from "../scenes/GameScene";

export default class CardDrawer {
    private scene: GameScene;
    private cardData: CardDTO[];
    private bingo: { cols: number; rows: number };

    constructor(
        scene: GameScene,
        bingo: { cols: number; rows: number },
        cardData: CardDTO[]
    ) {
        this.scene = scene;
        this.bingo = bingo;
        this.cardData = cardData;
    }

    drawCards(): void {
        const { cols, rows } = this.bingo;
        let cardIndex = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const card = this.cardData[cardIndex];
                const x =
                    this.scene.cameras.main.centerX -
                    (cols * card.width) / 2 +
                    col * card.width +
                    50;
                const y =
                    this.scene.cameras.main.centerY -
                    (rows * card.height) / 2 +
                    row * card.height +
                    100;

                const cardImage = this.scene.add
                    .image(x, y, "BingoCard")
                    .setFrame(0)
                    .setDisplaySize(card.width, card.height)
                    .setOrigin(0.5, 0.5)
                    .setInteractive();

                const cardText = this.scene.add
                    .text(x, y, `${card.number}`, {
                        fontSize: "20px",
                        color: "#000",
                        fontStyle: "bold",
                    })
                    .setOrigin(0.5, 0.5);

                card["text"] = cardText;

                cardImage.on("pointerdown", () => {
                    this.scene.checkCorrect(card, cardImage, cardText);
                });

                cardIndex++;
            }
        }
    }
}
