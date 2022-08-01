import { AbstractAsyncNode } from '../abstract/AbstractAsyncNode';
import { IChainable } from '../types';

export class DelayNode<T = unknown> extends AbstractAsyncNode<T> implements IChainable<T> {
  public exec(input: T): void {
    this.$setTimeout(() => this.$clearAndExec(input));
  }
}
