import { ITargetable, NextFN } from './types';

export function buildNextFnForTargetable<T>(targetable: ITargetable<T>): NextFN<T> {
  let called = false;
  
  function nextFn(output: T): T | Promise<T> | null | void {
    if (called) throw new Error('NextFN has already been called!')
    nextFn.invalidate();
    targetable.target?.exec(output);
  }

  function hasBeenCalled(): boolean {
    return called;
  }

  function invalidate(): void {
    called = true;
  }

  nextFn.hasBeenCalled = hasBeenCalled;
  nextFn.invalidate = invalidate;
  return nextFn;
}
