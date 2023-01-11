import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function pick(...properties: Array<string>): IExecutableFn {
  function _pick({ next }: IExecutionOptions, ...args: AnyArgs): void {
    const os = args.map((a: object) => {
      const o = {};
      properties.forEach((prop: string) => o[prop] = a[prop]);
      return o;
    });
    next(...os);
  }

  return _pick;
}
