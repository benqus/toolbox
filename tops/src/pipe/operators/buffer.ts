import { AnyArgs } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function buffer(size: number): IExecutableFn {
  let buffer: Array<AnyArgs> = [];

  function _buffer(options: IPipeController, ...args: AnyArgs): void {
    buffer.push(args);
    if (buffer.length < size) return;
    options.next(buffer);
    buffer = [];
  }

  return _buffer;
}
