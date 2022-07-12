export interface IContext<T = unknown> {
  readonly scope: Record<string | number | symbol, unknown>;
  value: T;
  transition(_oldValue: T, newValue: T): T;
}

export interface IStore {
  scheduleTriggerListeners(): void;
  subscribe(fn: Function): [ Function, () => void ];
  context<T = unknown>(_name: string, _value: T): IContext<T>;
}