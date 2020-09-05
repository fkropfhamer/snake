import { Color } from "./enums";
import Rectangle from "./rectangle";

interface GameState {
    snakeSegments: Rectangle[],
    apple: Rectangle,
}

export default class View {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private cellSize: number;
    private playFieldSize: number;

    constructor(playFieldSize: number) {
        this.playFieldSize = playFieldSize;
        this.setupCanvas();
    }

    public drawGameState(gameState: GameState): void {
        this.reset();
        gameState.snakeSegments.forEach(snakeSegment => {
            this.drawSquare(snakeSegment.x, snakeSegment.y, snakeSegment.color)
        });
        this.drawSquare(gameState.apple.x, gameState.apple.y, gameState.apple.color);
    }

    private reset(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayField();
    }

    private drawSquare(x: number, y: number, color: Color): void {
        this.context.fillStyle = color;
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    private setupCanvas(): void {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.resizeCanvas();
        document.getElementById("root").appendChild(this.canvas);
        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }

    private resizeCanvas(): void {
        const windowWidth: number = window.innerWidth;
        const windowHeight: number = window.innerHeight;

        const canvasSize: number = windowWidth >= windowHeight ? windowHeight : windowWidth;

        this.cellSize = canvasSize / this.playFieldSize;

        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
    }

    private drawPlayField(): void {
        const endOfPlayField: number = this.playFieldSize * this.cellSize;
        for (let i = 0; i <= endOfPlayField; i += this.cellSize) {
            this.drawLine(i, 0, i, endOfPlayField);
            this.drawLine(0, i, endOfPlayField, i);
        }
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number): void {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
}
