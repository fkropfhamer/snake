import { Color } from "./enums";
import View from "./view";

export default class Rectangle {
    protected x: number;
    protected y: number;
    private color: Color;

    constructor(x: number, y: number, color: Color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setColor(color: Color): void {
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

    public draw(view: View): void {
        view.drawSquare(this.x, this.y, this.color);
    }
}
