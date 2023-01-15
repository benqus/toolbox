import { resolveDependencies } from '../common/resolveDependencies';
import { topic } from '../topic';
import { IObservableFn, observable } from '../observable';
import { IStateFn, IStateFnDependencies } from './types';
import { Maybe } from '../common';

const defaultDependencies: IStateFnDependencies = { topic, observable };

export function state<T extends object = object>(
  defaults: T = null,
  dependencies: Partial<IStateFnDependencies> = {},
): IStateFn<T> {
  const { topic, observable } = resolveDependencies<IStateFnDependencies>(dependencies, defaultDependencies);

  const _topic = topic<[T]>();
  const _observables: Map<keyof T, IObservableFn<T[keyof T]>> = new Map();

  function _state(): T {
    const values = {} as T;
    for (const k of _observables.keys()) {
      values[k] = _value(k);
    }
    return values;
  }

  function _serializeStateAndNotifyTopic(): void {
    const payload = _state();
    _topic(payload);
  }

  function _set(key: keyof T, value: T[keyof T]): void {
    let _observable: Maybe<IObservableFn<T[keyof T]>> = _observables.get(key) ?? null;

    if (_observable === null) {
      _observable = observable<T[keyof T]>()
      _observable.listen(_serializeStateAndNotifyTopic);
      _observables.set(key, _observable);
    }

    _observable(value);
  }

  function _get(key: keyof T): IObservableFn<T[keyof T]> {
    return _observables.get(key);
  }
  
  function _value(key: keyof T): T[keyof T] {
    return _get(key).latest();
  }

  if (defaults != null) {
    Object.keys(defaults).forEach((k: string) => _set(k as keyof T, defaults[k]));
  }

  _state.set = _set;
  _state.get = _get;
  _state.value = _value;

  _state.listen = _topic.listen;
  _state.kill = (): void => {
    _observables.forEach(o => o.kill());
    _observables.clear();

    _topic.kill();
  };

  return _state;
}
