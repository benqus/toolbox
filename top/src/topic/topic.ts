import { AnyArgs, Fn, IUnsubscribe } from '../common/types';
import { ITopic } from './types';

export function topic<Args extends AnyArgs = AnyArgs>(
  exec: Fn<[Fn, Args]> = (fn: Fn, args: Args): void => fn(...args),
): ITopic<Args> {
  const subscriptions: Set<Fn<Args>> = new Set();

  function _topic(...args: Args): void {
    exec(publish, args);
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
