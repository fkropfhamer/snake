import { Color } from "./enums";

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

    public draw(): void {
        // TODO
    }
}
