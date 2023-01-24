import { AnyArgs, Fn, IUnsubscribe } from '../common/types';
import { Topic, Publisher } from './types';

export function topic<Args extends AnyArgs = AnyArgs>(
  publisher: Publisher<Args> = (fn: Fn<Args>, args: Args): void => fn(...args),
): Topic<Args> {
  const subscriptions: Set<Fn<Args>> = new Set();

  function _topic(...args: Args): void {
    publisher(publish, args);
  }

  function publish(...args: Args): void {
    subscriptions.forEach((fn: Fn<Args>): void => fn(...args));
  }

  function subscribe(fn: Fn<Args>): IUnsubscribe {
    subscriptions.add(fn);
    return (): boolean => subscriptions.delete(fn);
  }

  return Object.assign(_topic, { subscribe });
}
