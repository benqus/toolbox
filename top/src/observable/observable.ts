import { ITopic, topic } from '../topic';
import { TObservable } from './types';

export function observable<T extends object = object>(
  props: T,
  observableTopic: ITopic<[T]> = topic<[T]>(),
): TObservable<T> {
  const { subscribe } = observableTopic;
  const target = Object.create(Object.freeze({ subscribe }));

  Object.seal(Object.assign(target, props));

  function set(target: T, prop: string, value: T[keyof T], receiver: any): boolean {
    const result = Reflect.set(target, prop, value, receiver);
    if (result) observableTopic(target);
    return result;
  }

  return new Proxy<TObservable<T>>(target, { set });
}
