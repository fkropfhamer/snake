import IPosition from "./positioninterface";

export default abstract class Util {
    public static isOcuppiedPosition(position: IPosition, occupiedPositions: IPosition[]): boolean {
        const onSamePositions: boolean[] = occupiedPositions.map((occupiedPosition: IPosition) => {
            return occupiedPosition.isOnSamePosition(position);
        });

        const isOcuppied: boolean = onSamePositions.reduce((acc, onSamePosition) => {
            return acc || onSamePosition;
        });

        return isOcuppied;
    }
}
