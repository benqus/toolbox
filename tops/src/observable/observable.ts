import { Maybe, resolveDependencies } from '../common';
import { topic } from '../topic';
import { IObservableFn, IObservableFnDependencies } from './types';

const defaultDependencies: IObservableFnDependencies = { topic };

export function observable<T>(
  value: Maybe<T> = null,
  dependencies: Partial<IObservableFnDependencies> = {},
): IObservableFn<T> {
  const { topic } = resolveDependencies<IObservableFnDependencies>(dependencies, defaultDependencies);

  const _topic = topic<[T, T]>();

  function _observable(newValue: T): void {
    if (newValue === value) return;
    const oldValue = value;
    value = newValue;
    _topic(value, oldValue as T);
  }

  _observable.latest = (): T => value;
  _observable.listen = _topic.listen;
  _observable.kill = _topic.kill;

  return _observable;
}
