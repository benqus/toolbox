import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function buffer(size: number): IExecutableFn {
  let buffer: Array<Args> = [];

  function _buffer(options: IExecutionOptions, ...args: Args): void {
    buffer.push(args);
    if (buffer.length < size) return;
    options.next(buffer);
    buffer = [];
  }

  return _buffer;
}
