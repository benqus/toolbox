import { isSubscribable } from '../common/isSubscribable';
import { Unsubscriber } from '../common/types';
import { Topic, topic } from '../topic';
import { Observable } from './types';

export function observable<T extends object = object>(
  props: T,
  observableTopic: Topic<[T]> = topic<[T]>(),
): Observable<T> {
  const { subscribe } = observableTopic;
  const target = Object.create(Object.freeze({ subscribe }));
  const unsubscribes: Map<keyof T, Unsubscriber> = new Map();

  function handleTargetProperty(key: keyof T, value: T[keyof T]): T[keyof T] {
    if (isSubscribable(value)) {
      unsubscribes.get(key)?.(); // unsubscribe from existing observable, if any
      unsubscribes.set(key, value.subscribe(publish)); // resubscribe for key
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

  (Object.keys(props) as Array<keyof T>).forEach((key: keyof T): void => {
    target[key] = handleTargetProperty(key, props[key]);
  });

  Object.seal(target);

  return new Proxy<Observable<T>>(target, { set });
}
