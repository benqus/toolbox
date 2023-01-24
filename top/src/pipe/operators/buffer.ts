import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function buffer(size: number): Operator {
  let buffer: Array<AnyArgs> = [];

  function _buffer(options: IPipeController, ...args: AnyArgs): void {
    buffer.push(args);
    if (buffer.length < size) return;
    options.next(buffer);
    buffer = [];
  }

  return _buffer;
}
