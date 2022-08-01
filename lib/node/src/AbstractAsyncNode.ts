import { IExecutable, ITargetable } from './types';

export abstract class AbstractAsyncNode<Input> implements ITargetable<Input> {
  protected $t: NodeJS.Timeout | null = null;

  constructor(
    protected readonly $timeout: number
  ) {}

  protected $clear(): void {
    if (this.$t) {
      clearTimeout(this.$t);
      this.$t = null;
    }
  }

  protected $setTimeout(fn: () => unknown): void {
    this.$t = this.$t ?? setTimeout(() => {
      this.$clear();
      fn();
    }, this.$timeout);
  }

  protected $clearAndExec(input: Input): void {
    this.$clear();
    this.target?.exec(input);
  }

  public target: IExecutable<Input> | null = null;

  public cancel(): void {
    this.$clear();
  }
}
