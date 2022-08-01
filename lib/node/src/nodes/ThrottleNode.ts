import { AbstractAsyncNode } from '../abstract/AbstractAsyncNode';
import { IChainable } from '../types';

export class ThrottleNode<Input = unknown> extends AbstractAsyncNode<Input> implements IChainable<Input> {
  private _input?: Input;

  public exec(input: Input): void {
    this._input = input;
    this.$t = this.$t ?? this.$setTimeout(() => {
      if (this._input != null) {
        this.$clearAndExec(this._input);
        this._input = void 0;
      } else {
        this.$clear();
      }
    });
  }
}
