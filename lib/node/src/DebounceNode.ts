import { AbstractAsyncNode } from './AbstractAsyncNode';
import { IExecutable } from './types';

export class DebounceNode<Input = unknown>
  extends AbstractAsyncNode<Input>
    implements IExecutable<Input>
{
  public exec(input: Input): void {
    this.$clear();
    this.$setTimeout(() => this.$clearAndExec(input));
  }
}
