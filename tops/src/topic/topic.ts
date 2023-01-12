import { AnyArgs, Fn, FnTopicUnsubscribe } from '../common';
import { ITopicFn } from './types';

export function topic<Args extends AnyArgs = AnyArgs>(subs: Set<Fn<Args>> = new Set()): ITopicFn<Args> {
  function _topic(...args: Args): void {
    subs.forEach((fn: Fn<Args>) => fn(...args));
  }

  function listen(fn: Fn<Args>): FnTopicUnsubscribe {
    subs.add(fn);
    return (): boolean => subs.delete(fn);
  }

  _topic.listen = listen;
  _topic.kill = (): void => subs.clear();

  return _topic;
}
