import Config from "./config";
import Rectangle from "./rectangle";

export default class Apple extends Rectangle {
    constructor(x: number, y: number) {
        super(x, y, Config.APPLE_COLOR);
    }
}
