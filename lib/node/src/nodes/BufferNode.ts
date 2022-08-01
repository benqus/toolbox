import { IChainable, ITargetable } from '../types';

export class BufferNode<T = unknown> implements IChainable<T>, ITargetable<Array<T>> {
  private _buffer: Array<T> = [];

  constructor(
    private readonly _size: number
  ) {}

  public target: IChainable<Array<T>> | null = null;

  public exec(input: T): void {
    this._buffer.push(input);
    if (this._buffer.length < this._size) return;
    this.target?.exec(this._buffer);
    this._buffer = [];
  }
}
