import Phaser from "phaser";
import { BingoDTO } from "../dto/BingoDTO";
import { CardDTO } from "../dto/CardDTO";
import { BingoData } from "../data/BingoData";
import { CardData } from "../data/CardData";
import { CalculationDTO } from "../dto/CalculationDTO";
import { CalculationData } from "../data/CalculationData";
import BackgroundLoader from "../utilities/BackgroundLoader";
import TimerManager from "../utilities/TimerManager";
import MenuScene from "./MenuScene";
import SoundManager from "../utilities/SoundManager";
import CardDrawer from "../utilities/CardDrawer";
import CalculationDrawer from "../utilities/CalculationDrawer";

export default class GameScene extends Phaser.Scene {
    private bingo: BingoDTO;
    private cardData: CardDTO[] = [];
    public soundManager: SoundManager | null = null;
    private currentCalculation: CalculationDTO;
    private calculationText: Phaser.GameObjects.Text;
    private usedIndexes: Set<number> = new Set();
    private duration: number;
    private timerManager: TimerManager;
    private timerText: Phaser.GameObjects.Text;
    private removedIndexes: Set<number> = new Set();
    private calculationDrawer: CalculationDrawer;

    constructor() {
        super({ key: "GameScene" });
    }

    init(data: { operator: string; duration: number }): void {
        console.log("Received operator:", data.operator);
        console.log("Received duration:", data.duration);
        const bingoConfig = BingoData[0];
        this.bingo = new BingoDTO(
            bingoConfig.id,
            bingoConfig.cols,
            bingoConfig.rows,
            [data.operator]
        );

        this.duration = data.duration;

        this.timerManager = new TimerManager(
            this,
            this.duration,
            this.onTimeOut.bind(this)
        );
        this.calculationDrawer = new CalculationDrawer(this);
        this.updateCalculation(data.operator);
    }

    preload(): void {
        this.load.spritesheet("explosion", "assets/sprite/explosion.png", {
            frameWidth: 160,
            frameHeight: 160,
        });
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
        this.soundManager = new SoundManager(this, ["ScoreMusic"]);
        this.soundManager.preload();
    }

    create(): void {
        if (this.soundManager) {
            this.soundManager.play("ScoreMusic", false);
        }
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 8,
            }),
            frameRate: 10,
            repeat: 0,
        });
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
        if (!this.calculationDrawer) {
            // console.error("calculationDrawer is not initialized!");
        } else {
            this.calculationDrawer.drawCalculation(this.currentCalculation);
        }
        this.calculationDrawer.drawCalculation(this.currentCalculation);

        if (!this.calculationText) {
            this.calculationText = this.add
                .text(this.cameras.main.centerX, 150, "", {
                    fontSize: "24px",
                    color: "#000",
                    fontStyle: "bold",
                    align: "center",
                })
                .setOrigin(0.5, 0.5);
        }

        this.calculationText.setText(
            this.calculationDrawer.getCalculationText(this.currentCalculation)
        );
        const cardDrawer = new CardDrawer(this, this.bingo, this.cardData);
        cardDrawer.drawCards();

        const timerX = this.cameras.main.centerX;
        const timerY = 50;
        const timerRadius = 40;

        const timerClock = this.add.graphics();
        timerClock.lineStyle(4, 0x000000, 1);
        timerClock.strokeCircle(timerX, timerY, timerRadius);

        const timerArc = this.add.graphics();
        timerArc.setDepth(1);

        let remainingTime = this.duration;
        const initialAngle = Phaser.Math.DegToRad(270);

        // Hàm cập nhật đồng hồ
        const updateClock = () => {
            timerArc.clear();

            remainingTime = Math.max(0, this.timerManager.getRemainingTime());

            if (remainingTime <= 0) {
                this.onTimeOut();
                return;
            }

            const progress = remainingTime / this.duration;
            const endAngle = initialAngle - progress * Phaser.Math.PI2;

            timerArc.fillStyle(0x007bff, 1);
            timerArc.slice(
                timerX,
                timerY,
                timerRadius - 5,
                initialAngle,
                endAngle,
                true
            );
            timerArc.fillPath();
        };

        this.time.addEvent({
            delay: 1000 / 60,
            callback: updateClock,
            callbackScope: this,
            loop: true,
        });

        this.timerManager.start();
        this.scale.on("resize", this.resize, this);
    }
    resize(gameSize: Phaser.Structs.Size): void {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
    }
    onTimeOut(): void {
        this.updateCalculation(this.bingo.operator[0]);

        this.calculationText.setText(
            this.calculationDrawer.getCalculationText(this.currentCalculation)
        );

        // Reset lại bộ đếm thời gian
        this.timerManager.reset();
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
    checkCorrect(
        card: CardDTO,
        cardImage: Phaser.GameObjects.Image,
        cardText: Phaser.GameObjects.Text
    ): void {
        if (card.number === this.currentCalculation.result && !card.marked) {
            const explosion1 = this.add
                .sprite(200, 100, "explosion")
                .setDisplaySize(150, 150);
            explosion1.play("explode");
            explosion1.on("animationcomplete", () => explosion1.destroy());

            const explosion2 = this.add
                .sprite(600, 100, "explosion")
                .setDisplaySize(150, 150);
            explosion2.play("explode");
            explosion2.on("animationcomplete", () => explosion2.destroy());

            card.marked = true;
            cardImage.setTint(0x00ff00);
            cardImage.disableInteractive();

            // Đánh dấu câu hỏi hiện tại vào usedIndexes
            const filteredData = CalculationData.filter((calc) =>
                calc.operator.includes(this.bingo.operator[0])
            );
            const currentIndex = filteredData.findIndex(
                (calc) =>
                    calc.valueA === this.currentCalculation.valueA &&
                    calc.valueB === this.currentCalculation.valueB &&
                    calc.result === this.currentCalculation.result
            );

            if (currentIndex !== -1) {
                this.usedIndexes.add(currentIndex);
                console.log("Added to usedIndexes:", currentIndex);
            }

            this.timerManager.reset(this.duration);
            console.log(`Timer reset to: ${this.duration} seconds`);

            if (this.checkWin()) {
                this.scene.start("EndScene");
            } else if (!this.checkRemainingWinningPaths()) {
                this.scene.start("LostScene");
            } else {
                this.updateCalculation(this.bingo.operator[0]);
                this.calculationText.setText(
                    this.calculationDrawer.getCalculationText(
                        this.currentCalculation
                    )
                );
            }
        } else {
            // const incorrectAnswer = card.number;
            // const filteredData = CalculationData.filter((calc) =>
            //     calc.operator.includes(this.bingo.operator[0])
            // );
            // const indexToRemove = filteredData.findIndex(
            //     (calc, index) =>
            //         calc.result === incorrectAnswer &&
            //         !this.removedIndexes.has(index) &&
            //         !this.usedIndexes.has(index)
            // );

            // if (indexToRemove !== -1) {
            //     this.removedIndexes.add(indexToRemove);
            //     console.log(
            //         `Removed question: ${
            //             CalculationData[indexToRemove].valueA
            //         } ${this.calculationDrawer.convertOperatorToSymbol(
            //             CalculationData[indexToRemove].operator[0]
            //         )} ${CalculationData[indexToRemove].valueB} = ${
            //             CalculationData[indexToRemove].result
            //         }`
            //     );
            // }
            const incorrectAnswer = card.number;
            const indexToRemove = CardData.findIndex((c) => c.key === card.key);

            if (indexToRemove !== -1) {
                console.log(`Xóa thẻ ${card.key} khỏi dữ liệu`);
                CardData.splice(indexToRemove, 1); // Xóa khỏi danh sách
            }

            cardImage.destroy();
            cardText.destroy();
        }
    }
    checkRemainingWinningPaths(): boolean {
        const { cols, rows } = this.bingo;

        // Kiểm tra hàng
        for (let row = 0; row < rows; row++) {
            let markedCount = 0;
            for (let col = 0; col < cols; col++) {
                const cardKey = `card${row * cols + col + 1}`;
                const card = CardData.find((c) => c.key === cardKey);

                if (card) {
                    markedCount++;
                }

                if (markedCount >= 5) {
                    console.log(`Hàng ${row + 1} vẫn còn ít nhất 5 ô hợp lệ.`);
                    return true;
                }
            }
        }

        // Kiểm tra cột
        for (let col = 0; col < cols; col++) {
            let markedCount = 0;
            for (let row = 0; row < rows; row++) {
                const cardKey = `card${row * cols + col + 1}`;
                const card = CardData.find((c) => c.key === cardKey);

                if (card) {
                    markedCount++;
                }

                if (markedCount >= 5) {
                    console.log(`Cột ${col + 1} vẫn còn ít nhất 5 ô hợp lệ.`);
                    return true;
                }
            }
        }

        return false;
    }

    updateCalculation(operator: string): void {
        console.log(`Operator: ${operator}`);

        const filteredData = CalculationData.filter((calc) =>
            calc.operator.includes(operator)
        );
        console.log("Filtered Calculations:", filteredData);

        const unusedCalculations = filteredData.filter(
            (_, index) =>
                !this.usedIndexes.has(index) && !this.removedIndexes.has(index)
        );
        console.log("Unused Calculations:", unusedCalculations);

        if (unusedCalculations.length === 0) {
            this.scene.start("LostScene");
            return;
        }
        if (!this.calculationDrawer) {
            console.error("calculationDrawer is not initialized!");
        }
        console.log("Unused Calculations:");
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
    }
    update(): void {
        const remainingTime = Math.max(0, this.timerManager.getRemainingTime());

        if (remainingTime <= 0) {
            this.timerManager.stop();
        }
    }
}
