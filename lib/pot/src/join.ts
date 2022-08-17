import { pipe } from './pipe';
import { IPipeFn, IExecutableFn, IObservableFn } from './types';
import { getFnLatest } from './utils/getFnLatest';

export function join(
  pipesOrObservables: Array<IPipeFn | IObservableFn<unknown>>,
  ...fns: Array<IExecutableFn>
): IPipeFn {
  const _pipe = pipe(...fns);

  function _subscriber(): void {
    const args = pipesOrObservables.map(getFnLatest);
    _pipe(args);
  }

  pipesOrObservables.forEach((_p) => _p.topic.subscribe(_subscriber));

  return _pipe;
}
