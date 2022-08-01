import { IExecutable, ITargetable } from './types';

export class DelayNode<Input = unknown> implements IExecutable<Input>, ITargetable<Input> {
  constructor(
    private readonly _delay: number
  ) {}

  public target: IExecutable<Input> | null = null;

  public exec(input: Input): void {
    setTimeout(() => this.target?.exec(input), this._delay);
  }
}
