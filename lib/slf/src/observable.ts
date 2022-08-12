import { topic } from './topic';
import { IFnObservable } from './types';

export function observable<T>(value?: T): IFnObservable<T> {
  const t = topic();

  function _observable(newValue: T): void {
    const oldValue = value;
    t((value = newValue), oldValue as T);
  }

  function $latest(): T {
    return value as T;
  }

  function $empty(): void {
    value = void 0;
  }

  _observable.$empty = $empty;
  _observable.$latest = $latest;
  _observable.$subscribe = t.$subscribe;
  _observable.$unsubscribe = t.$unsubscribe;

  return _observable;
}
