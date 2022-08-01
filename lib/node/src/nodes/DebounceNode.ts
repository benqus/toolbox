import { AbstractAsyncNode } from '../abstract/AbstractAsyncNode';
import { IChainable } from '../types';

export class DebounceNode<Input = unknown> extends AbstractAsyncNode<Input> implements IChainable<Input> {
  private _input?: Input;

  public exec(input: Input): void {
    this._input = input;
    this.$clear();
    this.$t = this.$setTimeout(() => {
      if (this._input != null) {
        this.$clearAndExec(this._input as Input);
        this._input = void 0;
      }
    });
  }
}
