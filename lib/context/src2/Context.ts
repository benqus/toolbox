import { IContext } from "./types";

export class Context<T = unknown> implements IContext<T> {
  constructor(
    private _value: T = null,
    private readonly _onupdate: Function,
  ) {}

  public readonly scope: Record<string | number | symbol, unknown>;

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this.transition(this._value, value);
    this._value = value;
    this._onupdate?.();
  }

  public transition(_oldValue: T, newValue: T): T {
    return newValue;
  }
}
