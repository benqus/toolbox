import { pipe } from './pipe';
import { FnArgs, IFnPipe, IFn } from './types';

export function join(pipes: Array<IFnPipe>, ...fns: Array<IFn>): IFnPipe {
  const _pipe = pipe(...fns);
  let latestInputs: FnArgs = [];

  function _subscriber(): void {
    latestInputs = pipes.map((p) => p.$latest());
    _pipe(latestInputs);
  }

  pipes.forEach((pipe) => pipe.$subscribe(_subscriber));

  return _pipe;
}
