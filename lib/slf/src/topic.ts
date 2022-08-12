import { FnArgs, IFnTopic, TListener } from './types';

export function topic(subs: Set<TListener> = new Set()): IFnTopic {
  function _topic(...args: FnArgs): IFnTopic {
    subs.forEach((fn) => fn(...args));
    return _topic;
  }

  _topic.$subscribe = (...args: Array<TListener>): IFnTopic => {
    args.forEach((fn) => subs.add(fn));
    return _topic;
  };

  _topic.$unsubscribe = (...args: Array<TListener>): IFnTopic => {
    args.forEach((fn) => subs.delete(fn));
    return _topic;
  };

  return _topic;
}
