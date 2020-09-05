export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public isOnSamePosition(rectangle: Point): boolean {
        if (this.x === rectangle.x && this.y === rectangle.y) {
            return true;
        }
        return false;
    }

    public isOnOcuppiedPosition(occupiedPositions: Point[]): boolean {
        const onSamePositions: boolean[] = occupiedPositions.map((occupiedPosition: Point) => {
            return this.isOnSamePosition(occupiedPosition);
        });

        const isOcuppied: boolean = onSamePositions.reduce((acc, onSamePosition) => {
            return acc || onSamePosition;
        }, false);

        return isOcuppied;
    }
}
