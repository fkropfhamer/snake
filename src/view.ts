export default class View {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.setupCanvas();
    }

    private setupCanvas(): void {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        document.getElementById("root").appendChild(this.canvas);
    }
}
