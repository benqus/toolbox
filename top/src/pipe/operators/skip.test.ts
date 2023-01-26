import { createNextFn } from '../../__mocks__/nextFn';
import { skip } from './skip';

describe('skip', () => {
  test('fn', () => {
    const fn = skip(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('skips x calls then executes', () => {
    const mockNextFn = createNextFn();
    const fn = skip(4);

    fn(mockNextFn, 1, 2, 3);
    fn(mockNextFn, 2, 3, 4);
    fn(mockNextFn, 3, 4, 5);
    fn(mockNextFn, 4, 5, 6);
    fn(mockNextFn, 5, 6, 7);
    fn(mockNextFn, 6, 7, 8);

    expect(mockNextFn).toHaveBeenCalledTimes(2);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, 5, 6, 7);
    expect(mockNextFn).toHaveBeenNthCalledWith(2, 6, 7, 8);
  });
});
