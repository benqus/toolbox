import { AnyArgs, Fn } from '../../common/types';
import { topic } from '../topic';
import { ITopic } from '../types';

// Debounce Topic Publish handler
export function debounce<Args extends AnyArgs = AnyArgs>(timeout = 0): ITopic<Args> {
  let _t: NodeJS.Timeout | void = void 0;
  
  return topic<Args>((fn: Fn, args: Args): void => {
    if (_t) _t = clearTimeout(_t);
    _t = setTimeout(() => {
      fn(...args);
    }, timeout);
  });
}
