import { createNextFn } from '../../__mocks__/nextFn';
import { take } from './take';

describe('take', () => {
  test('fn', () => {
    const fn = take(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('takes only x calls', () => {
    const mockNextFn = createNextFn();
    const fn = take(4);

    fn(mockNextFn, 1, 2, 3);
    fn(mockNextFn, 2, 3, 4);
    fn(mockNextFn, 3, 4, 5);
    fn(mockNextFn, 4, 5, 6);
    fn(mockNextFn, 5, 6, 7);
    fn(mockNextFn, 6, 7, 8);

    expect(mockNextFn).toHaveBeenCalledTimes(4);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(mockNextFn).toHaveBeenNthCalledWith(2, 2, 3, 4);
    expect(mockNextFn).toHaveBeenNthCalledWith(3, 3, 4, 5);
    expect(mockNextFn).toHaveBeenNthCalledWith(4, 4, 5, 6);
  });
});
