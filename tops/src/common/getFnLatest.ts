import { IPipeFn } from '../pipe';
import { Fn } from './types';

export function getFnLatest(p_: Fn): unknown {
  return typeof (p_ as IPipeFn).latest === 'function' ? (p_ as IPipeFn).latest() : p_();
}
