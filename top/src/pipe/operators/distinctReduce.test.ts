import { createNextFn } from '../../__mocks__/nextFn';
import { distinctReduce } from './distinctReduce';

describe('distinctReduce', () => {
  test('fn', () => {
    const s = distinctReduce(() => ({}));

    expect(s).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const mockNextFn = createNextFn();
    const s = distinctReduce((n, m) => n + m);

    s(mockNextFn, 1, 2);
    s(mockNextFn, 3, 4);
    s(mockNextFn, 3, 4);

    expect(mockNextFn).toHaveBeenCalledTimes(2);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, 1, 2);
    expect(mockNextFn).toHaveBeenNthCalledWith(2, 3, 4);
  });
});
