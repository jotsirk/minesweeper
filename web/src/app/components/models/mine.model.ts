export class Mine {

  private _indexX: number;
  private _indexY: number;
  private _isBomb: Boolean;
  private _howManyBombsTouching: number;
  private _isRevealed: Boolean = false;

  constructor(indexX: number, indexY: number, isBomb: Boolean, howManyBombsTouching: number) {
    this._indexX = indexX;
    this._indexY = indexY;
    this._isBomb = isBomb;
    this._howManyBombsTouching = howManyBombsTouching;
  }

  get indexX(): number {
    return this._indexX;
  }

  set indexX(value: number) {
    this._indexX = value;
  }

  get indexY(): number {
    return this._indexY;
  }

  set indexY(value: number) {
    this._indexY = value;
  }

  get isBomb(): Boolean {
    return this._isBomb;
  }

  set isBomb(value: Boolean) {
    this._isBomb = value;
  }

  get howManyBombsTouching(): number {
    return this._howManyBombsTouching;
  }

  set howManyBombsTouching(value: number) {
    this._howManyBombsTouching = value;
  }

  get isRevealed(): Boolean {
    return this._isRevealed;
  }

  set isRevealed(value: Boolean) {
    this._isRevealed = value;
  }

}
