import Apple from "./apple";
import Config from "./config";
import { Key } from "./enums";
import Rectangle from "./rectangle";
import View from "./view";

export default class Snake {
    private view: View;
    private apple: Apple;
    private interval: NodeJS.Timeout;
    private lastKeyPressed: Key = Key.ARROW_DOWN;
    private snakeSegments: Rectangle[] = [];

    constructor() {
        this.setup();
        this.start();
    }

    private end(): void {
        clearInterval(this.interval);
    }

    private placeApple(): void {
        let x: number;
        let y: number;
        let newApple: Apple;

        while (true) {
            x = Math.floor(Math.random() * Config.PLAY_FIELD_SIZE);
            y = Math.floor(Math.random() * Config.PLAY_FIELD_SIZE);

            newApple = new Apple(x, y);

            if (!newApple.isOnOcuppiedPosition(this.snakeSegments)) {
                this.apple = newApple;
                break;
            }
        }
    }

    private setup(): void {
        const head = new Rectangle(0, 0, Config.SNAKE_HEAD_COLOR);
        this.snakeSegments.unshift(head);
        this.view = new View(Config.PLAY_FIELD_SIZE);
        this.placeApple();
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
                break;
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
        this.view.drawGameState({ snakeSegments: this.snakeSegments, apple: this.apple });
    }

    private update(): void {
        const oldHead: Rectangle = this.head;
        oldHead.color = Config.SNAKE_SEGMENTS_COLOR;

        let newX: number = oldHead.x;
        let newY: number = oldHead.y;

        switch (this.lastKeyPressed) {
            case Key.ARROW_DOWN:
                newY += 1;
                break;
            case Key.ARROW_LEFT:
                newX -= 1;
                break;
            case Key.ARROW_RIGHT:
                newX += 1;
                break;
            case Key.ARROW_UP:
                newY -= 1;
                break;
        }

        if (newX < 0 || newX >= Config.PLAY_FIELD_SIZE || newY < 0 || newY >= Config.PLAY_FIELD_SIZE) {
            this.end();
        }

        const newHead = new Rectangle(newX, newY, Config.SNAKE_HEAD_COLOR);

        const isHittingItSelf: boolean = newHead.isOnOcuppiedPosition(this.snakeSegments);

        if (isHittingItSelf) {
            this.end();
        }

        this.snakeSegments.unshift(newHead);

        if (newHead.isOnSamePosition(this.apple)) {
            this.placeApple();
        } else {
            this.snakeSegments.pop();
        }
    }

    private get head(): Rectangle {
        return this.snakeSegments[0];
    }
}
