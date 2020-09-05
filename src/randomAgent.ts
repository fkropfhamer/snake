import { Agent } from "./learningSnake";

export default class RandomAgent implements Agent {
    
    predict(): number {
        return Math.floor(Math.random() * 3);
    }

    train(): void {
        console.log('trained');
    }
}