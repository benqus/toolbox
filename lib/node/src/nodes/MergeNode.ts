import { IChainable, ITargetable } from '../types';

export class MergeNode<T = unknown> implements IChainable<T>, ITargetable<T> {
  private _value: Partial<T> = {};

  constructor(initValue: Partial<T>) {
    this._value = initValue;
  }

  public target: IChainable<Partial<T>> | null = null;

  public exec(value: Partial<T>): void {
    this._value = Object.assign(this._value, value) as T;
    this.target?.exec(this._value);
  }
}
