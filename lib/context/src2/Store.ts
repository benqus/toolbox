import { Context } from './Context';
import { IStore } from './types';

export class Store implements IStore {
  private readonly _l: Set<Function> = new Set();
  private readonly _c: Map<string, Context> = new Map();
  private _t: NodeJS.Timeout = null;

  public scheduleTriggerListeners = (): void => {
    this._t = this._t ?? setTimeout(this._triggerListeners, 0);
  }

  private _triggerListeners(): void {
    clearTimeout(this._t);
    this._t = null;
    this._l.forEach((fn: Function) => fn());
  }

  public subscribe(fn: Function): [ Function, () => void ] {
    this._l.add(fn);
    return [ fn, () => this._l.delete(fn) ];
  }

  public context<T = unknown>(name: string, value: T): Context<T> {
    if (this._c.has(name)) {
      const c = this._c.get(name);
      c.value = value;
      return c as Context<T>;
    }

    const c = new Context<T>(value, this.scheduleTriggerListeners);
    this._c.set(name, c);
    return c;
  }
}
