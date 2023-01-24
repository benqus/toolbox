import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function pick(...properties: Array<string>): Operator {
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
