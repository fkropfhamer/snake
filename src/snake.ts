import Apple from "./apple";
import Config from "./config";
import { Key } from "./enums";
import Game from "./game";
import Rectangle from "./rectangle";
import View from "./view";

export default class Snake {
    private snakeSegments: Rectangle[] = [];
    private game: Game;

    constructor(x: number, y: number, game: Game) {
        const head = new Rectangle(x, y, Config.SNAKE_HEAD_COLOR);
        this.snakeSegments.unshift(head);
        this.game = game;
    }

    public draw(view: View): void {
        this.snakeSegments.forEach((snakeSegment: Rectangle) => snakeSegment.draw(view));
    }

    public getSnakeSegments(): Rectangle[] {
        return this.snakeSegments;
    }

    public update(lastKeyPressed: Key, apple: Apple): void {
        const oldHead: Rectangle = this.head;
        oldHead.setColor(Config.SNAKE_SEGMENTS_COLOR);

        let newX: number = oldHead.getX();
        let newY: number = oldHead.getY();

        switch (lastKeyPressed) {
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

        if (newX < 0 || newX >= Config.PLAY_FIELD_SIZE || newY < 0 || newY >= Config.PLAY_FIELD_SIZE) {
            this.game.end();
        }

        const newHead = new Rectangle(newX, newY, Config.SNAKE_HEAD_COLOR);

        const isHittingItSelf: boolean = newHead.isOnOcuppiedPosition(this.snakeSegments);

        if (isHittingItSelf) {
            this.game.end();
        }

        if (newHead.isOnSamePosition(apple)) {
            this.game.placeApple([newHead, ...this.snakeSegments]);
        } else {
            this.snakeSegments.pop();
        }

        this.snakeSegments.unshift(newHead);
    }

    private get head(): Rectangle {
        return this.snakeSegments[0];
    }

}
