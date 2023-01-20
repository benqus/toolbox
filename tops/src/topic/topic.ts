import { AnyArgs, Fn, IUnsubscribe } from '../common';
import { ITopic } from './types';

export function topic<Args extends AnyArgs = AnyArgs>(executor: Fn<[Fn]> = (fn: Fn): void => fn()): ITopic<Args> {
  const subscriptions: Set<Fn<Args>> = new Set();

  function _topic(...args: Args): void {
    executor((): void => subscriptions.forEach((fn: Fn<Args>): void => fn(...args)));
  }

  function subscribe(fn: Fn<Args>): IUnsubscribe {
    return (): boolean => this.subscriptions.delete(fn);
  }

  return Object.assign(_topic, { subscribe });
}

// Throttle topic with custom timeout
topic.throttle = function throttle<Args extends AnyArgs = AnyArgs>(timeout = 0): ITopic<Args> {
  let _t: NodeJS.Timeout | void = void 0;
  
  return topic<Args>((fn: Fn): void => {
    _t = _t || setTimeout(() => {
      if (_t) _t = clearTimeout(_t);
      fn();
    }, timeout);
  });
}
