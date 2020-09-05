import "./index.css";
import RandomAgent from "./randomAgent";
import LearningSnake from "./learningSnake";

function main(): void {
    const agent = new RandomAgent();

    new LearningSnake(agent);
}

main();
