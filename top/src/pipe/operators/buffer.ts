import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function buffer(size: number): Operator {
  let buffer: Array<AnyArgs> = [];

  function _buffer(next: NextFn, ...args: AnyArgs): void {
    buffer.push(args);
    if (buffer.length < size) return;
    next(buffer);
    buffer = [];
  }

  return _buffer;
}
