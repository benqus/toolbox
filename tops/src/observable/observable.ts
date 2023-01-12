import { topic } from '../topic';
import { IObservableFn } from './types';

export function observable<T>(value?: T): IObservableFn<T> {
  const _topic = topic<[T, T]>();

  function _observable(newValue: T): void {
    if (newValue === value) return;
    const oldValue = value;
    value = newValue;
    _topic(value, oldValue as T);
  }

  _observable.latest = (): T => value;
  _observable.subscribe = _topic.subscribe;
  _observable.unsubscribe = _topic.unsubscribe;
  _observable.clear = _topic.clear;

  return _observable;
}
