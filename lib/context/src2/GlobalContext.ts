import { IContext } from "./types";

export class GlobalContext<T> implements IContext<T> {
  private static readonly _l: Set<Function> = new Set();
  private static _t: NodeJS.Timeout = null;

  public static _scheduleTriggerListeners = (): void => {
    GlobalContext._t = GlobalContext._t ?? setTimeout(GlobalContext._triggerListeners, 0);
  }

  private static _triggerListeners(): void {
    clearTimeout(GlobalContext._t);
    GlobalContext._t = null;
    GlobalContext._l.forEach((fn: Function) => fn());
  }

  constructor(private _value: T = null) {}
  
  public readonly scope: Record<string | number | symbol, unknown> = {};

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this.transition(this._value, value);
    this._value = value;
    GlobalContext._scheduleTriggerListeners();
  }

  public subscribe(fn: Function): [ Function, () => void ] {
    GlobalContext._l.add(fn);
    return [ fn, () => GlobalContext._l.delete(fn) ];
  }

  public transition(_oldValue: T, newValue: T): T {
    return newValue;
  }
}
