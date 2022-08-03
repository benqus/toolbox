import { Listener, ListenerSet } from '@b/common/types';

export class Observable<T = unknown> {
  private readonly _l: ListenerSet<[T, Observable<T>]> = new Set();
  private _value: T;

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
    this._l.forEach((fn: Listener<[T, Observable<T>]>) => fn(this.value, this));
  }

  public subscribe(...fns: Array<Listener<[T, Observable<T>]>>): void {
    fns.forEach(fn => this._l.add(fn));
  }

  public unsubscribe(...fns: Array<Listener<[T, Observable<T>]>>): void {
    fns.forEach(fn => this._l.delete(fn));
  }
  
  public clear(): void {
    this._l.clear();
  }
}
