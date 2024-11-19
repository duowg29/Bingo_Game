export class ButtonDTO {
    key: string;
    text: string;
    positionX: number;
    positionY: number;
    onClick: () => void;

    constructor(key: string, text: string, positionX: number, positionY: number, onClick: () => void) {
        this.key = key;
        this.text = text;
        this.positionX = positionX;
        this.positionY = positionY;
        this.onClick = onClick;
    }
}
