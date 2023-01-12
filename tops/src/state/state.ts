import { topic, UnsubscribeFn } from '../topic';
import { observable, IObservableFn } from '../observable';
import { IStateFn } from './types';

export function state<T extends object = object>(defaults: T = null): IStateFn<T> {
  const _topic = topic<[T]>();
  const _observables: Map<keyof T, IObservableFn<T[keyof T]>> = new Map();
  const _unsubs: Set<UnsubscribeFn> = new Set();

  function _state(): T {
    const values = {} as T;
    for (const k of _observables.keys()) {
      values[k] = _value(k);
    }
    return values;
  }

  function _subscribeToObservable(key: keyof T): void {
    const unsub = _get(key).subscribe(_serializeStateAndNotifyTopic);
    _unsubs.add(unsub);
  }

  function _serializeStateAndNotifyTopic(): void {
    const payload = _state();
    _topic(payload);
  }

  function _set(key: keyof T, value: T[keyof T]): void {
    if (!_observables.has(key)) {
      _observables.set(key, observable<T[keyof T]>());
    }

    _subscribeToObservable(key);
    _get(key)(value); // update observable
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

  _state.subscribe = _topic.subscribe;
  _state.unsubscribe = _topic.unsubscribe;
  _state.clear = (): void => {
    _topic.clear();
    
    _observables.forEach(o => o.clear());
    _observables.clear();

    _unsubs.forEach(unsub => unsub());
    _unsubs.clear();
  };

  return _state;
}
