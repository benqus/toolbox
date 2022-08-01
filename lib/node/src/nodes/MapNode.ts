import { IChainable, ITargetable, MapFN } from '../types';

export class MapNode<Input = unknown, Output = unknown> implements IChainable<Input>, ITargetable<Output> {
  constructor(
    private readonly _mapFn: MapFN<Input, Output>
  ) {}

  public target: IChainable<Output> | null = null;

  public exec(input: Input): void {
    try {
      const output = this._mapFn(input);
      this.target?.exec(output);
    } catch (e) {
      console.error('Error: Node#exec failed', e);
      throw e;
    }
  }
}
