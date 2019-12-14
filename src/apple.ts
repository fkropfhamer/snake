import Config from "./config";
import Rectangle from "./rectangle";

export default class Apple extends Rectangle {
    constructor(x: number, y: number) {
        super(x, y, Config.APPLE_COLOR);
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
