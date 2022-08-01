import { FilterFN, IChainable, ITargetable } from '../types';

export class FilterNode<T = unknown> implements IChainable<T>, ITargetable<T> {
  constructor(
    private readonly _filter: FilterFN<T> = () => true
  ) {}

  public target: IChainable<T> | null = null;

  public exec(payload: T): void {
    try {
      if (this._filter(payload)) this.target?.exec(payload);
    } catch (e) {
      console.error('Error: Node#exec failed', e);
      throw e;
    }
  }
}
