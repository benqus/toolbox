import { isSubscribable } from '../common/isSubscribable';
import { Unsubscriber } from '../common/types';
import { Topic, topic } from '../topic';
import { Observable } from './types';

export function observable<T extends object = object>(props: T, observableTopic = topic<[T]>()): Observable<T> {
  const { subscribe } = observableTopic;
  const target = Object.create(Object.freeze({ subscribe }));
  const unsubscribes: Map<keyof T, Unsubscriber> = new Map();

  function handleTargetProperty(key: keyof T, value: T[keyof T]): T[keyof T] {
    if (isSubscribable(value)) {
      unsubscribes.get(key)?.(); // unsubscribe from existing observable, if any
      const unsubscribe = value.subscribe(publish);  // resubscribe for key
      if (typeof unsubscribe === 'function') unsubscribes.set(key, unsubscribe);
    }
    return value;
  }

  function publish(): void {
    observableTopic(target);
  }

  function set(target: T, key: string, value: T[keyof T], receiver: any): boolean {
    const result = Reflect.set(target, key, handleTargetProperty(key as keyof T, value), receiver);
    if (result) publish();
    return result;
  }

  for (const [ key, value ] of Object.entries(props)) {
    target[key] = handleTargetProperty(key as keyof T, value);
  }

  Object.seal(target);

  return new Proxy<Observable<T>>(target, { set });
}
