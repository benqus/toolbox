import { share, pipe } from '../src';

describe('share.spec', () => {
  test('sharing execution to other pipes', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const mainFn = jest.fn();

    const targetPipe1 = pipe(fn1);
    const targetPipe2 = pipe(fn2);
    const targetPipeFn = jest.fn();

    const sourcePipe = pipe(
      (n1: number, n2: number): number => n1 + n2,
      share(
        targetPipe1,
        targetPipe2,
        targetPipeFn,
      ),
      mainFn,
    );

    sourcePipe(5, 6);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(11);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledWith(11);
    expect(targetPipeFn).toHaveBeenCalledTimes(1);
    expect(targetPipeFn).toHaveBeenCalledWith(11);
    expect(mainFn).toHaveBeenCalledTimes(1);
    expect(mainFn).toHaveBeenCalledWith(11);
  });
});
