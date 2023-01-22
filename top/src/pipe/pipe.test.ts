import { pipe } from './pipe';

describe('pipe', () => {
  test('fn', () => {
    const p_ = pipe();

    expect(p_).toEqual(expect.any(Function));
    expect(p_.latest).toEqual(expect.any(Function));
    expect(p_.subscribe).toEqual(expect.any(Function));
  });

  test('passes a new INextOptions object and the args for the fns', () => {
    const fn = jest.fn();
    const p_ = pipe(fn);

    p_(1, 2, 3);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0].next).toEqual(expect.any(Function));
    expect(fn.mock.calls[0][0].end).toEqual(expect.any(Function));
    expect(fn.mock.calls[0].slice(1)).toEqual([1, 2, 3]);
  });

  test('nextOptions - next - calls next fn wiht original args', () => {
    const exec1 = jest.fn(({ next }) => next());
    const exec2 = jest.fn(({ next }) => next());
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

  test('nextOptions - next', () => {
    const exec1 = jest.fn(({ next }) => next(5));
    const exec2 = jest.fn(({ next }) => next());
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

  test('nextOptions - end', () => {
    const exec1 = jest.fn(({ next }) => next());
    const end = jest.fn(({ end }) => end());
    const exec2 = jest.fn();
    const p = pipe(
      exec1,
      end,
      exec2
    );

    const subscriber = jest.fn();
    p.subscribe(subscriber);
    
    p(1, 2, 3);

    expect(exec1).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledTimes(1);
    expect(exec2).not.toHaveBeenCalled();
    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(1, 2, 3);
  });

  test('latest', () => {
    const p = pipe();
    
    p(1, 2, 3);

    expect(p.latest()).toEqual([1, 2, 3]);
  });
  
  test('pipe topic is invoked after fns', () => {
    const subscriber = jest.fn();
    const fn = ({ next }) => next(4, 5, 6);
    const p_ = pipe(fn);
    p_.subscribe(subscriber);
    
    p_(1, 2, 3);

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(4, 5, 6);
  });
  
});
