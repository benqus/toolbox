import { IExecutable, ITargetable, DistinctFN } from './types';

export class DistinctNode<Input = unknown, DistinctType = unknown>
  implements IExecutable<Input>, ITargetable<Input>
{
  private _lastValue: any = null;

  constructor(
    private readonly _distinctFn: DistinctFN<Input, DistinctType>
  ) {}

  public target: IExecutable<Input> | null = null;

  public exec(input: Input): void {
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
