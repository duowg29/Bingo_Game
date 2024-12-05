import Phaser from "phaser";
import { BingoDTO } from "../dto/BingoDTO";
import { CardDTO } from "../dto/CardDTO";
import { BingoData } from "../data/BingoData";
import { CardData } from "../data/CardData";
import { CalculationDTO } from "../dto/CalculationDTO";
import { CalculationData } from "../data/CalculationData";
import BackgroundLoader from "../utilities/BackgroundLoader";

export default class GameScene extends Phaser.Scene {
    private bingo: BingoDTO;
    private cardData: CardDTO[] = [];
    private currentCalculation: CalculationDTO;
    private calculationText: Phaser.GameObjects.Text;
    private usedIndexes: Set<number> = new Set();

    constructor() {
        super({ key: "GameScene" });
    }

    init(data: { operator: string; duration: number }): void {
        const bingoConfig = BingoData[0];
        this.bingo = new BingoDTO(
            bingoConfig.id,
            bingoConfig.cols,
            bingoConfig.rows,
            [data.operator]
        );

        console.log("GameScene Init Data:", {
            key: this.bingo.key,
            cols: this.bingo.cols,
            rows: this.bingo.rows,
            operator: this.bingo.operator,
        });

        this.updateCalculation(data.operator);
    }

    preload(): void {
        this.load.atlas(
            "BingoCard",
            "assets/BingoCard.png",
            "assets/BingoCard.json"
        );
        this.load.atlas(
            "CalculationCard",
            "assets/CalculationCard.png",
            "assets/CalculationCard.json"
        );
        this.load.image("whiteBg", "assets/images/whiteBg.png");
    }

    create(): void {
        const backgroundLoader = new BackgroundLoader(
            this,
            "whiteBg",
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );
        backgroundLoader.loadBackground();
        const selectedOperator = this.bingo.operator[0];
        const filteredData = CalculationData.filter((calc) =>
            calc.operator.includes(selectedOperator)
        );

        this.cardData = filteredData.slice(0, 25).map((calc, index) => {
            const cardInfo = CardData[index];
            return new CardDTO(
                `card${index + 1}`,
                calc.result,
                cardInfo.width,
                cardInfo.height,
                false
            );
        });

        this.drawCalculation();
        this.drawCards();
    }

    drawCalculation(): void {
        const calcText = this.getCalculationText(this.currentCalculation);

        const calculationCard = this.add
            .image(this.cameras.main.centerX, 150, "CalculationCard")
            .setFrame(0)
            .setDisplaySize(200, 50)
            .setOrigin(0.5, 0.5);

        this.calculationText = this.add
            .text(this.cameras.main.centerX, 150, calcText, {
                fontSize: "24px",
                color: "#000",
                fontStyle: "bold",
                align: "center",
            })
            .setOrigin(0.5, 0.5);
    }

    getCalculationText(calculation: CalculationDTO): string {
        const operatorSymbol = this.convertOperatorToSymbol(
            calculation.operator[0]
        );
        return `${calculation.valueA} ${operatorSymbol} ${calculation.valueB} = ?`;
    }

    convertOperatorToSymbol(operator: string): string {
        switch (operator) {
            case "Addition":
                return "+";
            case "Subtraction":
                return "-";
            case "Multiplication":
                return "*";
            case "Division":
                return "/";
            default:
                return "";
        }
    }

    drawCards(): void {
        const { cols, rows } = this.bingo;
        let cardIndex = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const card = this.cardData[cardIndex];
                const x =
                    this.cameras.main.centerX -
                    (cols * card.width) / 2 +
                    col * card.width +
                    50;
                const y =
                    this.cameras.main.centerY -
                    (rows * card.height) / 2 +
                    row * card.height +
                    100;

                const cardImage = this.add
                    .image(x, y, "BingoCard")
                    .setFrame(0)
                    .setDisplaySize(card.width, card.height)
                    .setOrigin(0.5, 0.5)
                    .setInteractive();

                this.add
                    .text(x, y, `${card.number}`, {
                        fontSize: "20px",
                        color: "#000",
                        fontStyle: "bold",
                    })
                    .setOrigin(0.5, 0.5);

                cardImage.on("pointerdown", () => {
                    this.checkCorrect(card, cardImage);
                });

                cardIndex++;
            }
        }
    }
    checkWin(): boolean {
        const { cols, rows } = this.bingo;

        for (let row = 0; row < rows; row++) {
            let markedCount = 0;
            for (let col = 0; col < cols; col++) {
                const index = row * cols + col;
                if (this.cardData[index].marked) {
                    markedCount++;
                    if (markedCount === 5) return true;
                } else {
                    markedCount = 0;
                }
            }
        }

        for (let col = 0; col < cols; col++) {
            let markedCount = 0;
            for (let row = 0; row < rows; row++) {
                const index = row * cols + col;
                if (this.cardData[index].marked) {
                    markedCount++;
                    if (markedCount === 5) return true;
                } else {
                    markedCount = 0;
                }
            }
        }

        return false;
    }

    checkCorrect(card: CardDTO, cardImage: Phaser.GameObjects.Image): void {
        if (card.number === this.currentCalculation.result && !card.marked) {
            card.marked = true;
            cardImage.setTint(0x00ff00);

            if (this.checkWin()) {
                this.scene.start("EndScene");
            } else {
                this.updateCalculation(this.bingo.operator[0]);
                this.calculationText.setText(
                    this.getCalculationText(this.currentCalculation)
                );
            }
        }
    }

    updateCalculation(operator: string): void {
        const filteredData = CalculationData.filter((calc) =>
            calc.operator.includes(operator)
        );

        const unusedCalculations = filteredData.filter(
            (_, index) => !this.usedIndexes.has(index)
        );

        if (unusedCalculations.length === 0) {
            this.usedIndexes.clear();
        }

        const randomCalculation =
            unusedCalculations[
                Math.floor(Math.random() * unusedCalculations.length)
            ];

        this.currentCalculation = new CalculationDTO(
            randomCalculation.valueA,
            randomCalculation.valueB,
            randomCalculation.result,
            [operator]
        );

        const usedIndex = filteredData.indexOf(randomCalculation);
        this.usedIndexes.add(usedIndex);
    }

    update(): void {}
}
