import { isSubscribable } from '../common/isSubscribable';
import { Unsubscriber, Fn } from '../common/types';

export function handleSubscribable<T extends object = object>(
  key: keyof T,
  value: T[keyof T],
  publish: Fn,
  unsubscribes: Map<keyof T, Unsubscriber>,
): T[keyof T] {
  if (isSubscribable(value)) {
    unsubscribes.get(key)?.(); // unsubscribe from existing observable, if any
    const unsubscribe = value.subscribe(publish);  // resubscribe for key
    if (typeof unsubscribe === 'function') unsubscribes.set(key, unsubscribe);
  }
  return value;
}
