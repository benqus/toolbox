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

export class ValueEmitter<T = unknown> {
  private readonly _l: Set<Listener<[T]>> = new Set();
  private _value: T;

  protected emitValue(): void {
    this._l.forEach((fn: Listener<[T]>) => fn(this.value));
  }

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
  }

  public subscribe(...fns: Array<Listener<[T]>>): void {
    fns.forEach(fn => this._l.add(fn));
  }

  public unsubscribe(...fns: Array<Listener<[T]>>): void {
    fns.forEach(fn => this._l.delete(fn));
  }
}

export class AsyncValueEmitter<T = unknown> extends ValueEmitter<T> {
  private _t: NodeJS.Timeout | null;

  private _clear(): void {
    if (this._t) {
      clearTimeout(this._t);
    }
    this._t = null;
  }

  protected emitValue(): void {
    this._t = this._t || setTimeout(() => {
      this._clear();
      super.emitValue();
    }, 0);
  }
}
