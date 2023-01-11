import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function buffer(size: number): IExecutableFn {
  let buffer: Array<AnyArgs> = [];

  function _buffer(options: IExecutionOptions, ...args: AnyArgs): void {
    buffer.push(args);
    if (buffer.length < size) return;
    options.next(buffer);
    buffer = [];
  }

  return _buffer;
}
