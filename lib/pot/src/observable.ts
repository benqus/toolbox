import { topic } from './topic';
import { IObservableFn } from './types';

export function observable<T>(value?: T): IObservableFn<T> {
  function _observable(newValue: T): void {
    if (newValue === value) return;
    const oldValue = value;
    _observable.topic((value = newValue), oldValue as T);
  }

  _observable.latest = (): T => value as T;
  _observable.topic = topic();

  return _observable;
}
