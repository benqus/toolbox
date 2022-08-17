import { Args, ITopicFn, Fn } from './types';

export function topic(subs: Set<Fn> = new Set()): ITopicFn {
  function _topic(...args: Args): ITopicFn {
    subs.forEach((fn) => fn(...args));
    return _topic;
  }

  function subscribe (fn: Fn): ITopicFn {
    subs.add(fn);
    return _topic;
  }

  function unsubscribe (fn: Fn): ITopicFn {
    subs.delete(fn);
    return _topic;
  }

  function clear (): ITopicFn {
    subs.clear();
    return _topic;
  }

  _topic.subscribe = subscribe;
  _topic.unsubscribe = unsubscribe;
  _topic.clear = clear;

  return _topic;
}
