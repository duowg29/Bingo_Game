import Phaser from "phaser";
import { BingoDTO } from "../dto/BingoDTO";
import { CardDTO } from "../dto/CardDTO";
import { BingoData } from "../data/BingoData";
import { CardData } from "../data/CardData";

export default class GameScene extends Phaser.Scene {
    private bingo: BingoDTO;
    private cardData: CardDTO[] = [];
    private bingoBoard: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "GameScene" });
    }

    init(data: { operator: string; duration: number }): void {
        const bingoConfig = BingoData[0];
        this.bingo = new BingoDTO(
            bingoConfig.id,
            bingoConfig.cols,
            bingoConfig.rows,
            [bingoConfig.operator]
        );

        console.log("GameScene Init Data:", {
            key: this.bingo.key,
            cols: this.bingo.cols,
            rows: this.bingo.rows,
            operator: this.bingo.operator,
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
        this.bingoBoard = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "BingoBoard"
        );
        this.bingoBoard.setOrigin(0.5, 0.5).setDisplaySize(500, 500);

        this.cardData = CardData.map((card, index) => {
            const cardKey = card.key;
            const cardWidth = card.width;
            const cardHeight = card.height;
            const marked = card.marked;

            return new CardDTO(
                cardKey,
                index + 1,
                cardWidth,
                cardHeight,
                marked
            );
        });

        this.drawCards();
    }

    drawCards(): void {
        const offsetX = 20;
        const offsetY = 20;
        const cardWidth = 100;
        const cardHeight = 100;

        let cardIndex = 0;
        for (let row = 0; row < this.bingo.rows; row++) {
            for (let col = 0; col < this.bingo.cols; col++) {
                const x =
                    this.cameras.main.centerX -
                    250 +
                    col * (cardWidth + offsetX);
                const y =
                    this.cameras.main.centerY -
                    250 +
                    row * (cardHeight + offsetY);

                const card = this.cardData[cardIndex];

                const cardImage = this.add
                    .image(x, y, "BingoBoard")
                    .setFrame(0)
                    .setDisplaySize(cardWidth, cardHeight)
                    .setOrigin(0.5, 0.5);
                const operatorText = this.add
                    .text(x, y, `${this.bingo.operator[0]}`, {
                        fontSize: "16px",
                        color: "#000000",
                        align: "center",
                    })
                    .setOrigin(0.5, 0.5);

                cardIndex++;
            }
        }
    }

    update(): void {}
}
