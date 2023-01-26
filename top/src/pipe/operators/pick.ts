import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function pick(...properties: Array<string>): Operator {
  function _pick(next: NextFn, ...args: AnyArgs): void {
    const os = args.map((a: object) => {
      const o = {};
      properties.forEach((prop: string) => o[prop] = a[prop]);
      return o;
    });
    next(...os);
  }

  return _pick;
}
