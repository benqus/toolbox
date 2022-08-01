import { IExecutable, ITargetable } from './types';

export class ValueNode<T = unknown> implements IExecutable<T>, ITargetable<T> {
  private _value: T;

  public target: IExecutable<T> | null;

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
