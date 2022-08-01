import { IExecutable, ITargetable } from './types';

export class BufferNode<Input = unknown> implements IExecutable<Input>, ITargetable<Array<Input>> {
  private _buffer: Array<Input> = [];

  constructor(
    private readonly _size: number
  ) {}

  public target: IExecutable<Array<Input>> | null = null;

  public exec(input: Input): void {
    this._buffer.push(input);
    if (this._buffer.length < this._size) return; 
    this.target?.exec(this._buffer);
    this._buffer = [];
  }
}
