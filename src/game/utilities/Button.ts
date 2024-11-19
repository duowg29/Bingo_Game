import { ButtonDTO } from '../dto/ButtonDTO';

export default class Button {
    scene: Phaser.Scene;
    buttonDTO: ButtonDTO;
    button: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, buttonDTO: ButtonDTO) {
        this.scene = scene;
        this.buttonDTO = buttonDTO;
        this.button = this.createButton();
    }

    createButton(): Phaser.GameObjects.Text {
        const buttonText = this.scene.add.text(this.buttonDTO.positionX, this.buttonDTO.positionY, this.buttonDTO.text, {
            fontFamily: 'Maven Pro',
            fontSize: '24px',
            color: '#0f0',
            padding: { x: 10, y: 5 },
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', this.buttonDTO.onClick);

        buttonText.on('pointerover', () => {
            buttonText.setStyle({ color: '#ff0' });
            buttonText.setShadow(2, 2, '#333333', 2, true, true);
        });

        buttonText.on('pointerout', () => {
            buttonText.setStyle({ color: '#0f0' }); 
            buttonText.setShadow();
        });

        return buttonText;
    }
}
