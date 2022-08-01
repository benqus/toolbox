import { IChainable, ITargetable } from '../types';

export abstract class AbstractAsyncNode<T> implements ITargetable<T> {
  protected $t: NodeJS.Timeout | null = null;

  constructor(
    protected readonly $ms: number
  ) {}

  protected $clear(): void {
    if (this.$t) {
      clearTimeout(this.$t);
      this.$t = null;
    }
  }

  protected $setTimeout(fn: () => unknown): NodeJS.Timeout {
    return setTimeout(() => {
      this.$clear();
      fn();
    }, this.$ms);
  }

  protected $clearAndExec(input: T): void {
    this.$clear();
    this.target?.exec(input);
  }

  public target: IChainable<T> | null = null;

  public cancel(): void {
    this.$clear();
  }
}
