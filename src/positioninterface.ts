export default interface IPosition {
    getX: () => number;
    getY: () => number;
    isOnSamePosition: (position: IPosition) => boolean;
}
