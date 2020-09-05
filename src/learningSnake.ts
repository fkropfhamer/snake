import View from "./view";
import Point from "./point";
import Config from "./config";
import { randomEnum } from "./util";

enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

export interface Agent {
    predict: () => number,
    train: (score: number) => void
}

const draw = true;

export default class LearningSnake {
    private view: View;
    private apple: Point;
    private snakeSegments: Point[]
    private agent: Agent
    private currentDirection: Direction
    private isEnded: boolean;

    constructor(agent: Agent) {
        this.agent = agent
        this.setup();
        this.loop();
    }

    private setup() {
        const head = new Point(Math.floor(Math.random() * Config.PLAY_FIELD_SIZE), Math.floor(Math.random() * Config.PLAY_FIELD_SIZE));
        this.snakeSegments = [head];
        this.view = new View(Config.PLAY_FIELD_SIZE);
        this.placeApple();
        this.currentDirection = randomEnum(Direction)
    }

    private placeApple(): void {
        let x: number;
        let y: number;
        let newApple: Point;

        while (true) {
            x = Math.floor(Math.random() * Config.PLAY_FIELD_SIZE);
            y = Math.floor(Math.random() * Config.PLAY_FIELD_SIZE);

            newApple = new Point(x, y);

            if (!newApple.isOnOcuppiedPosition(this.snakeSegments)) {
                this.apple = newApple;
                break;
            }
        }
    }

    private loop() {
        if (draw) {
            this.draw();
        }

        const nextMove = this.possibleDirections[this.agent.predict()];
        this.update(nextMove);
        const score = this.getScore();
        this.agent.train(score)

        if (!this.isEnded) {
            setTimeout(this.loop.bind(this), 2000);
        }
    }

    private getScore() {
        if (this.isEnded) {
            return -50;
        }

        return 0;
    }

    private update(nextMove: Direction) {
        this.currentDirection = nextMove;
        const oldHead: Point = this.head;

        let newX: number = oldHead.x;
        let newY: number = oldHead.y;

        switch (nextMove) {
            case Direction.DOWN:
                newY += 1;
                break;
            case Direction.LEFT:
                newX -= 1;
                break;
            case Direction.RIGHT:
                newX += 1;
                break;
            case Direction.UP:
                newY -= 1;
                break;
        }

        if (newX < 0 || newX >= Config.PLAY_FIELD_SIZE || newY < 0 || newY >= Config.PLAY_FIELD_SIZE) {
            this.end();
        }

        const newHead = new Point(newX, newY);

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

    private get possibleDirections(): Direction[] {
        switch(this.currentDirection) {
            case Direction.UP:
                return [Direction.LEFT, Direction.UP, Direction.RIGHT];
            case Direction.DOWN:
                return [Direction.RIGHT, Direction.DOWN, Direction.LEFT];
            case Direction.RIGHT:
                return [Direction.UP, Direction.RIGHT, Direction.DOWN];
            case Direction.LEFT:
                return [Direction.DOWN, Direction.LEFT, Direction.UP];
        }
    }

    private draw(): void {
        this.view.drawGameState({ snakeSegments: this.snakeSegments, apple: this.apple });
    }

    private get head(): Point {
        return this.snakeSegments[0];
    }

    private end() {
        console.log('game ended');
        this.isEnded = true;
    }
}