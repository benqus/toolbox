import { FilterFN, IExecutable, ITargetable } from './types';

export class FilterNode<InOutPut = unknown> implements IExecutable<InOutPut>, ITargetable<InOutPut> {
  constructor(
    private readonly _filter: FilterFN<InOutPut> = () => true
  ) {}

  public target: IExecutable<InOutPut> | null = null;

  public exec(payload: InOutPut): void {
    try {
      if (this._filter(payload)) this.target?.exec(payload);
    } catch (e) {
      console.error('Error: Node#exec failed', e);
      throw e;
    }
  }
}
