import { AnyArgs, Fn } from '../../common/types';
import { topic } from '../topic';
import { ITopic } from '../types';

// Throttle Topic Publish handler
export function throttle<Args extends AnyArgs = AnyArgs>(timeout = 0): ITopic<Args> {
  let _t: NodeJS.Timeout | void = void 0;
  let lastArgs: Args;
  
  return topic<Args>((fn: Fn<Args>, args: Args): void => {
    lastArgs = args;
    if (_t) return;
    _t = setTimeout(() => {
      if (_t) _t = clearTimeout(_t);
      fn(...lastArgs);
      lastArgs = [] as Args;
    }, timeout);
  });
}
