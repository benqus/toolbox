import { IChainable, ITargetable, DistinctFN } from '../types';

export class DistinctNode<T = unknown, D = unknown> implements IChainable<T>, ITargetable<T> {
  private _lastValue: unknown = null;

  constructor(
    private readonly _distinctFn: DistinctFN<T, D>
  ) {}

  public target: IChainable<T> | null = null;

  public exec(input: T): void {
    try {
      const value = this._distinctFn(input);
      if (value === this._lastValue) return;
      this.target?.exec(input);
      this._lastValue = value;
    } catch (e) {
      console.error('Error: Node#exec failed', e);
      throw e;
    }
  }
}
