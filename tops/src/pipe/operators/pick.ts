import { AnyArgs } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function pick(...properties: Array<string>): IExecutableFn {
  function _pick({ next }: IPipeController, ...args: AnyArgs): void {
    const os = args.map((a: object) => {
      const o = {};
      properties.forEach((prop: string) => o[prop] = a[prop]);
      return o;
    });
    next(...os);
  }

  return _pick;
}