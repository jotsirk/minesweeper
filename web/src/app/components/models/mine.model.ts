export class Mine {

  private _indexX: number;
  private _indexY: number;
  private _displayValue: string = '';
  private _isRevealed: boolean = false;
  private _isFlagged: boolean = false;

  constructor(indexX: number, indexY: number, displayValue: string, isRevealed: boolean, isFlagged: boolean) {
    this._indexX = indexX;
    this._indexY = indexY;
    this._displayValue = displayValue;
    this._isRevealed = isRevealed;
    this._isFlagged = isFlagged;
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

  get isRevealed(): boolean {
    return this._isRevealed;
  }

  set isRevealed(value: boolean) {
    this._isRevealed = value;
  }

  get displayValue(): string {
    return this._displayValue;
  }

  set displayValue(value: string) {
    this._displayValue = value;
  }

  get isFlagged(): boolean {
    return this._isFlagged;
  }

  set isFlagged(value: boolean) {
    this._isFlagged = value;
  }

  get coordinates() {
    return [this.indexX, this.indexY];
  }

}
