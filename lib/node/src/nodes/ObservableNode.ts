import { IChainable, ITargetable } from '../types';

export class ObservableNode<T = unknown> implements IChainable<T>, ITargetable<T> {
  private _value: T;

  public target: IChainable<T> | null;

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
    this.target?.exec(this.value);
  }

  public exec(value: T): void {
    this.value = value;
  }
}
