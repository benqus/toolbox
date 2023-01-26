import { pipe } from './pipe';
import { NextFn } from './types';

describe('pipe', () => {
  test('fn', () => {
    const p_ = pipe();

    expect(p_).toEqual(expect.any(Function));
    expect(p_.latest).toEqual(expect.any(Function));
    expect(p_.subscribe).toEqual(expect.any(Function));
  });

  test('passes a new next function object and the args for the fns', () => {
    const fn = jest.fn();
    const p_ = pipe(fn);

    p_(1, 2, 3);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toEqual(expect.any(Function));
    expect(fn.mock.calls[0].slice(1)).toEqual([1, 2, 3]);
  });

  test('next - calls next fn with original args', () => {
    const exec1 = jest.fn((next: NextFn) => next());
    const exec2 = jest.fn((next: NextFn) => next());
    const p_ = pipe(
      exec1,
      exec2,
    );

    p_(1, 2, 3);

    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1.mock.calls[0].slice(1)).toEqual([1, 2, 3]);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2.mock.calls[0].slice(1)).toEqual([1, 2, 3]);
  });

  test('next', () => {
    const exec1 = jest.fn((next: NextFn) => next(5));
    const exec2 = jest.fn((next: NextFn) => next());
    const p_ = pipe(
      exec1,
      exec2,
    );

    p_(1, 2, 3);

    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1.mock.calls[0].slice(1)).toEqual([1, 2, 3]);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2.mock.calls[0].slice(1)).toEqual([5]);
  });
  
  test('latest default', () => {
    const p = pipe();
    
    expect(p.latest()).toEqual([]);
  });

  test('latest', () => {
    const p = pipe();
    
    p(1, 2, 3);

    expect(p.latest()).toEqual([1, 2, 3]);
  });
  
  test('pipe topic is invoked after fns', () => {
    const subscriber = jest.fn();
    const fn = (next: NextFn) => next(4, 5, 6);
    const p_ = pipe(fn);
    p_.subscribe(subscriber);
    
    p_(1, 2, 3);

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(4, 5, 6);
  });
  
});
