import { Color } from "./enums";

export default abstract class Config {
    public static APPLE_COLOR: Color = Color.RED;
    public static SNAKE_HEAD_COLOR: Color = Color.BLACK;
    public static SNAKE_SEGMENTS_COLOR: Color = Color.GREEN;

    public static LOOP_INTERVAL = 1000;
    public static PLAY_FIELD_SIZE = 10;
}
