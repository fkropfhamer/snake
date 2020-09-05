import { Color } from "./enums";

export default class Rectangle {
    x: number;
    y: number;
    color: Color;

    constructor(x: number, y: number, color: Color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public isOnSamePosition(rectangle: Rectangle): boolean {
        if (this.x === rectangle.x && this.y === rectangle.y) {
            return true;
        }
        return false;
    }

    public isOnOcuppiedPosition(occupiedPositions: Rectangle[]): boolean {
        const onSamePositions: boolean[] = occupiedPositions.map((occupiedPosition: Rectangle) => {
            return this.isOnSamePosition(occupiedPosition);
        });

        const isOcuppied: boolean = onSamePositions.reduce((acc, onSamePosition) => {
            return acc || onSamePosition;
        }, false);

        return isOcuppied;
    }
}
