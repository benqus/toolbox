import { ISubscribable } from './types';

export function isSubscribable(arg: any): arg is ISubscribable {
  return (!!arg && typeof arg === 'object' && typeof arg.subscribe === 'function');
}
