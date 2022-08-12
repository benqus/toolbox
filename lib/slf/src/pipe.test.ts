import { pipe } from './pipe';
import { Stop } from './stop';

describe('pipe', () => {
  test('fn', () => {
    const p = pipe();

    expect(p).toEqual(expect.any(Function));
    expect(p.$empty).toEqual(expect.any(Function));
    expect(p.$latest).toEqual(expect.any(Function));
    expect(p.$subscribe).toEqual(expect.any(Function));
    expect(p.$unsubscribe).toEqual(expect.any(Function));
  });

  test('$latest', () => {
    const p = pipe();
    
    p(1, 2, 3);

    expect(p.$latest()).toEqual([1, 2, 3]);
  });
  
  test('$empty', () => {
    const p = pipe();
    
    expect(p.$latest()).toEqual([]);
    
    p(1, 2, 3);
    p.$empty();

    expect(p.$latest()).toEqual([]);
  });
  
  test('$subscribe', () => {
    const p = pipe(
      jest.fn().mockReturnValue([4, 5, 6]),
    );

    const subscriber = jest.fn();
    p.$subscribe(subscriber);
    
    p(1, 2, 3);

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(4, 5, 6);
  });
  
  test('$unsubscribe', () => {
    const p = pipe(
      jest.fn().mockReturnValue([4, 5, 6]),
    );

    const subscriber = jest.fn();
    p.$subscribe(subscriber);
    
    p(1, 2, 3);

    p.$unsubscribe(subscriber);

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(4, 5, 6);
  });
  
  test('empty pipe returns arguments as an a array', () => {
    const p = pipe();
    
    const r = p(1, 2, 3);

    expect(r).toEqual([1, 2, 3]);
  });

  test('undefined return value forwards previous arguments', () => {
    const exec1 = jest.fn();
    const exec2 = jest.fn();
    const p = pipe(
      exec1,
      exec2,
    );

    p(1, 2, 3);

    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1).toHaveBeenCalledWith(1, 2, 3);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(1, 2, 3);
  });

  test('array return value is spread for next fn', () => {
    const exec1 = jest.fn().mockReturnValue([4, 5, 6]);
    const exec2 = jest.fn();
    const p = pipe(
      exec1,
      exec2,
    );

    p(1, 2, 3);

    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1).toHaveBeenCalledWith(1, 2, 3);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(4, 5, 6);
  });

  test('return value - sync', () => {
    const exec1 = jest.fn();
    const exec2 = jest.fn().mockReturnValue(null);
    const p = pipe(
      exec1,
      exec2,
    );

    const r = p(1, 2, 3);

    expect(r).toEqual([null]);
  });

  test('return value - async', async () => {
    const exec1 = jest.fn().mockResolvedValue([4, 5, 6]);
    const exec2 = jest.fn().mockReturnValue(null);
    const p = pipe(
      exec1,
      exec2,
    );

    const r = await p(1, 2, 3);

    expect(r).toEqual([null]);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(4, 5, 6);
  });

  test('execution stops when Stop is queued', () => {
    const exec1 = jest.fn().mockReturnValue(5);
    const exec2 = jest.fn();
    const p = pipe(
      exec1,
      Stop,
      exec2,
    );

    const r = p(1, 2, 3);

    expect(r).toEqual([5]);
    expect(exec2).not.toHaveBeenCalled();
  });

  test('execution stops when Stop is returned', () => {
    const exec1 = jest.fn().mockReturnValue(5);
    const exec2 = () => Stop;
    const exec3 = jest.fn();
    const p = pipe(
      exec1,
      exec2,
    );

    const r = p(1, 2, 3);

    expect(r).toEqual([5]);
    expect(exec3).not.toHaveBeenCalled();
  });

});
