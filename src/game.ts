import Apple from "./apple";
import Config from "./config";
import { Key } from "./enums";
import Snake from "./snake";
import View from "./view";

export default class Game {
    private view: View;
    private snake: Snake;
    private apple: Apple;
    private interval: NodeJS.Timeout;
    private lastKeyPressed: Key = Key.ARROW_DOWN;

    constructor() {
        this.setup();
        this.start();
    }

    public end(): void {
        clearInterval(this.interval);
    }

    public placeApple(): void {
        // TODO
    }

    private setup(): void {
        this.view = new View();
        this.snake = new Snake(0, 0, this);
        this.apple = new Apple(0, 0);
    }

    private start(): void {
        this.interval = setInterval(this.loop.bind(this), Config.LOOP_INTERVAL);
    }

    private loop(): void {
        this.update();
        this.draw();
    }

    private draw(): void {
        this.apple.draw();
        this.snake.draw();
    }

    private update(): void {
        this.snake.update(this.lastKeyPressed, this.apple);
    }
}