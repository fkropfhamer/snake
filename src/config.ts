import { Color } from "./enums";

export default abstract class Config {
    public static APPLE_COLOR: Color = Color.RED;
    public static SNAKE_HEAD_COLOR: Color = Color.BLUE;
    public static SNAKE_SEGMENTS_COLOR: Color = Color.GREEN;

    public static LOOP_INTERVAL: number = 1000;
    public static PLAY_FIELD_SIZE: number = 10;
}
