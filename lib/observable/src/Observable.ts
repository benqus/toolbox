import { Listener } from '@b/common/types';

export class Observable<T = unknown> {
  private readonly _l: Set<Listener<[T]>> = new Set();
  private _value: T;

  protected $emitValue(): void {
    this._l.forEach((fn: Listener<[T]>) => fn(this.value));
  }

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
    this.$emitValue();
  }

  public subscribe(...fns: Array<Listener<[T]>>): void {
    fns.forEach(fn => this._l.add(fn));
  }

  public unsubscribe(...fns: Array<Listener<[T]>>): void {
    fns.forEach(fn => this._l.delete(fn));
  }
  
  public clear(): void {
    this._l.clear();
  }
}
