import { Args, Listener, ListenerSet } from '@b/common/types';

export class Emitter<T extends Args = Args> {
  private readonly _l: ListenerSet<T> = new Set();

  public subscribe(...fns: Array<Listener<T>>): void {
    fns.forEach(fn => this._l.add(fn));
  }

  public unsubscribe(...fns: Array<Listener<T>>): void {
    fns.forEach(fn => this._l.delete(fn));
  }

  public emit(...args: T): void {
    this._l.forEach((fn: Listener<T>) => fn(...args));
  }

  public clear(): void {
    this._l.clear();
  }
}
