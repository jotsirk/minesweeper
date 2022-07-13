export class Mine {

  private _indexX: number;
  private _indexY: number;
  private _displayValue: string | null = null;
  private _isRevealed: Boolean = false;

  constructor(indexX: number, indexY: number) {
    this._indexX = indexX;
    this._indexY = indexY;
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

  get isRevealed(): Boolean {
    return this._isRevealed;
  }

  set isRevealed(value: Boolean) {
    this._isRevealed = value;
  }

  get displayValue(): string | null {
    return this._displayValue;
  }

  set displayValue(value: string | null) {
    this._displayValue = value;
  }

  get coordinates() {
    return [this.indexX, this.indexY];
  }

}
