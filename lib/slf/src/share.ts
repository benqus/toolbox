import { FnArgs, IFn } from './types';

export function share(...fns: IFn<FnArgs, unknown>[]): IFn<FnArgs, unknown> {
  return function _share(...args: FnArgs): void {
    fns.forEach((fn) => fn(...args));
  };
}
