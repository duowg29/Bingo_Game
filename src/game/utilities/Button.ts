import { ButtonDTO } from "../dto/ButtonDTO";

export const buttonStyle1: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "Maven Pro",
    fontSize: "24px",
    color: "#0f0",
    stroke: "#000000",
    strokeThickness: 2,
    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#333333",
        blur: 5,
        fill: true,
    },
    padding: { x: 10, y: 5 },
};

export const buttonStyle2: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "Maven Pro",
    fontSize: "60px",
    color: "#000000",
    stroke: "#000000",
    strokeThickness: 2,
    padding: { x: 20, y: 10 },
};

export default class Button {
    scene: Phaser.Scene;
    buttonDTO: ButtonDTO;
    button: Phaser.GameObjects.Text;
    border: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, buttonDTO: ButtonDTO) {
        this.scene = scene;
        this.buttonDTO = buttonDTO;
        this.button = this.createButton();
        // this.border = this.createBorder();
    }

    createButton(): Phaser.GameObjects.Text {
        let buttonStyle = buttonStyle1;

        if (this.buttonDTO.style === "Button2") {
            buttonStyle = buttonStyle2;
        }

        const buttonText = this.scene.add
            .text(
                this.buttonDTO.positionX,
                this.buttonDTO.positionY,
                this.buttonDTO.text,
                buttonStyle
            )
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", this.buttonDTO.onClick);

        buttonText.on("pointerover", () => {
            buttonText.setStyle({ color: "#ff0" });
            buttonText.setShadow(2, 2, "#333333", 2, true, true);
        });

        buttonText.on("pointerout", () => {
            buttonText.setStyle({ color: "#000000" });
            // buttonText.setShadow();
        });

        return buttonText;
    }

    // createBorder(): Phaser.GameObjects.Rectangle {
    //     const buttonWidth = this.button.width + 20;
    //     const buttonHeight = this.button.height + 20;

    //     // Vẽ viền xung quanh button
    //     const border = this.scene.add
    //         .rectangle(
    //             this.button.x,
    //             this.button.y,
    //             buttonWidth,
    //             buttonHeight,
    //             0x000000
    //         )
    //         .setOrigin(0.5)
    //         .setStrokeStyle(4, 0x000000); // Vẽ viền với màu đen và độ dày là 4

    //     return border;
    // }
}
