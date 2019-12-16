import Apple from "./apple";
import Config from "./config";
import { Key } from "./enums";
import Rectangle from "./rectangle";
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

    public placeApple(occupiedPositions: Rectangle[]): void {
        let x: number;
        let y: number;
        let newApple: Apple;

        while (true) {
            x = Math.round(Math.random() * Config.PLAY_FIELD_SIZE);
            y = Math.round(Math.random() * Config.PLAY_FIELD_SIZE);

            newApple = new Apple(x, y);

            if (!newApple.isOnOcuppiedPosition(occupiedPositions)) {
                this.apple = newApple;
                break;
            }
        }
    }

    private setup(): void {
        this.view = new View();
        this.snake = new Snake(0, 0, this);
        this.placeApple(this.snake.getSnakeSegments());
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    private onKeyUp(event: KeyboardEvent): void {
        switch (event.code) {
            case Key.ARROW_DOWN:
                this.lastKeyPressed = Key.ARROW_DOWN;
                break;
            case Key.ARROW_LEFT:
                this.lastKeyPressed = Key.ARROW_LEFT;
                break;

            case Key.ARROW_RIGHT:
                this.lastKeyPressed = Key.ARROW_RIGHT;
                break;
            case Key.ARROW_UP:
                this.lastKeyPressed = Key.ARROW_UP;
                break;
            default:
                this.lastKeyPressed = this.lastKeyPressed;
        }
    }

    private start(): void {
        this.interval = setInterval(this.loop.bind(this), Config.LOOP_INTERVAL);
    }

    private loop(): void {
        this.update();
        this.draw();
    }

    private draw(): void {
        this.view.reset();
        this.apple.draw(this.view);
        this.snake.draw(this.view);
    }

    private update(): void {
        this.snake.update(this.lastKeyPressed, this.apple);
    }
}
