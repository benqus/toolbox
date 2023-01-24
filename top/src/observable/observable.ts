import { Topic, topic } from '../topic';
import { Observable } from './types';

export function observable<T extends object = object>(
  props: T,
  observableTopic: Topic<[T]> = topic<[T]>(),
): Observable<T> {
  const { subscribe } = observableTopic;
  const target = Object.create(Object.freeze({ subscribe }));

  Object.seal(Object.assign(target, props));

  function set(target: T, prop: string, value: T[keyof T], receiver: any): boolean {
    const result = Reflect.set(target, prop, value, receiver);
    if (result) observableTopic(target);
    return result;
  }

  return new Proxy<Observable<T>>(target, { set });
}
