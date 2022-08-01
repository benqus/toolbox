import { AbstractAsyncNode } from './AbstractAsyncNode';
import { IExecutable } from './types';

export class DebounceNode<Input = unknown>
  extends AbstractAsyncNode<Input>
    implements IExecutable<Input>
{
  private _input: Input;

  public exec(input: Input): void {
    this._input = input;
    this.$setTimeout(() => this.$clearAndExec(this._input));
  }
}
