import { Unsubscriber } from '../common/types';
import { topic } from '../topic';
import { Observable } from './types';
import { handleSubscribable } from './handleSubscribable';

export function observable<T extends object = object>(props: T, observableTopic = topic<[T]>()): Observable<T> {
  const { subscribe } = observableTopic;
  const target = Object.create(Object.freeze({ subscribe }));
  const unsubscribes: Map<keyof T, Unsubscriber> = new Map();

  function publish(): void {
    observableTopic(target);
  }

  function set(target: T, key: string, val: T[keyof T], rec: any): boolean {
    const result = Reflect.set(target, key, handleSubscribable(key as keyof T, val, publish, unsubscribes), rec);
    if (result) publish();
    return result;
  }

  for (const [ key, value ] of Object.entries(props)) {
    target[key] = handleSubscribable(key as keyof T, value, publish, unsubscribes);
  }

  Object.seal(target);

  return new Proxy<Observable<T>>(target, { set });
}
