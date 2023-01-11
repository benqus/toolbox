import { AnyArgs, ITopicFn, Fn, UnsubscribeFn } from './types';

export function topic<Args extends AnyArgs = AnyArgs>(subs: Set<Fn> = new Set()): ITopicFn<Args> {
  function _topic(...args: Args): ITopicFn {
    subs.forEach((fn: Fn<Args>) => fn(...args));
    return _topic;
  }

  function subscribe(fn: Fn<Args>): UnsubscribeFn {
    subs.add(fn);
    return function _unsubscribe(): void {
      unsubscribe(fn);
    };
  }

  function unsubscribe(fn: Fn<Args>): ITopicFn {
    subs.delete(fn);
    return _topic;
  }

  function clear(): ITopicFn {
    subs.clear();
    return _topic;
  }

  _topic.subscribe = subscribe;
  _topic.unsubscribe = unsubscribe;
  _topic.clear = clear;

  return _topic;
}
