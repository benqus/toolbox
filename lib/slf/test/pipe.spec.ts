import { pipe, stop } from '../src';

describe('pipe.spec', () => {
  const increment = jest.fn((n) => n + 1);
  const decrement = jest.fn((n) => n - 1);
  const wait = jest.fn((input: unknown) => {
    return new Promise(r => setTimeout(() => r(input), 100));
  });

  test('synchronous pipeline', ()=> {
    const _pipe = pipe(
      increment,
      increment,
      decrement,
      decrement,
    );

    const result = _pipe(0);
    
    expect(result).toEqual([0]);
    expect(increment).toHaveBeenCalledTimes(2);
    expect(increment).toHaveBeenNthCalledWith(1, 0);
    expect(increment).toHaveBeenNthCalledWith(2, 1);

    expect(decrement).toHaveBeenCalledTimes(2);
    expect(decrement).toHaveBeenNthCalledWith(1, 2);
    expect(decrement).toHaveBeenNthCalledWith(2, 1);
  });

  test('asynchronous pipeline', async () => {
    const _pipe = pipe(
      increment,
      wait,
      increment,
      wait,
      decrement,
      wait,
      decrement,
    );

    const result = await _pipe(0);
    
    expect(result).toEqual([0]);
    
    expect(wait).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenNthCalledWith(1, 1);
    expect(wait).toHaveBeenNthCalledWith(2, 2);
    expect(wait).toHaveBeenNthCalledWith(3, 1);

    expect(increment).toHaveBeenCalledTimes(2);
    expect(increment).toHaveBeenNthCalledWith(1, 0);
    expect(increment).toHaveBeenNthCalledWith(2, 1);

    expect(decrement).toHaveBeenCalledTimes(2);
    expect(decrement).toHaveBeenNthCalledWith(1, 2);
    expect(decrement).toHaveBeenNthCalledWith(2, 1);
  });

  test('combine sync & async pipes', async () => {
    const _combo = pipe(
      pipe(
        increment,
        increment,
        decrement,
        decrement,
        wait,
      ),
      pipe(
        increment,
        increment,
        decrement,
        decrement,
      ),
      pipe(
        increment,
        wait,
        increment,
        decrement,
        decrement,
      ),
    );
    
    const result = await _combo(0);

    expect(result).toEqual([0]);
    
    expect(wait).toHaveBeenCalledTimes(2);
    expect(wait).toHaveBeenNthCalledWith(1, 0);
    expect(wait).toHaveBeenNthCalledWith(2, 1);

    expect(increment).toHaveBeenCalledTimes(6);
    expect(increment).toHaveBeenNthCalledWith(1, 0);
    expect(increment).toHaveBeenNthCalledWith(2, 1);
    expect(increment).toHaveBeenNthCalledWith(3, 0);
    expect(increment).toHaveBeenNthCalledWith(4, 1);
    expect(increment).toHaveBeenNthCalledWith(5, 0);
    expect(increment).toHaveBeenNthCalledWith(6, 1);

    expect(decrement).toHaveBeenCalledTimes(6);
    expect(decrement).toHaveBeenNthCalledWith(1, 2);
    expect(decrement).toHaveBeenNthCalledWith(2, 1);
    expect(decrement).toHaveBeenNthCalledWith(3, 2);
    expect(decrement).toHaveBeenNthCalledWith(4, 1);
    expect(decrement).toHaveBeenNthCalledWith(5, 2);
    expect(decrement).toHaveBeenNthCalledWith(6, 1);
  });

  test('combine sync & async pipes & stop', async () => {
    const _combo = pipe(
      pipe(
        increment, // 0 >> 1
        increment, // 1 >> 2
        wait,
        stop,      // STOP
        decrement,
        decrement,
      ),
      pipe(
        increment, // 2 >> 3
        increment, // 3 >> 4
        decrement, // 4 >> 3
        stop,
        decrement,
      ),
      stop,        // STOP
      pipe(
        increment, // 3 >> 4
        wait,
        increment, // 4 >> 5
        decrement, // 5 >> 4
        stop,      // STOP
        decrement,
      ),
    );
    
    const result = await _combo(0);

    expect(result).toEqual([3]);
    
    expect(wait).toHaveBeenCalledTimes(1);
    expect(wait).toHaveBeenNthCalledWith(1, 2);

    expect(increment).toHaveBeenCalledTimes(4);
    expect(increment).toHaveBeenNthCalledWith(1, 0);
    expect(increment).toHaveBeenNthCalledWith(2, 1);
    expect(increment).toHaveBeenNthCalledWith(3, 2);
    expect(increment).toHaveBeenNthCalledWith(4, 3);

    expect(decrement).toHaveBeenCalledTimes(1);
    expect(decrement).toHaveBeenNthCalledWith(1, 4);
  });
});

