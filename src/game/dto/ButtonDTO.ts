export class ButtonDTO {
    key: string;
    text: string;
    positionX: number;
    positionY: number;
    onClick: () => void;
    style?: "Button1" | "Button2";

    constructor(
        key: string,
        text: string,
        positionX: number,
        positionY: number,
        onClick: () => void,
        style?: "Button1" | "Button2"
    ) {
        this.key = key;
        this.text = text;
        this.positionX = positionX;
        this.positionY = positionY;
        this.onClick = onClick;
        this.style = style;
    }
}
