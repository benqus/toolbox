import { createNextFn } from '../../__mocks__/nextFn';
import { buffer } from './buffer';

describe('buffer', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const s = buffer(100);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('buffer', () => {
    const mockNextFn = createNextFn();
    const d = buffer(4);

    d(mockNextFn, 1, 2);
    d(mockNextFn, 3, 4);
    d(mockNextFn, 5, 6);
    d(mockNextFn, 7, 8);

    d(mockNextFn, 10, 11);
    d(mockNextFn, 12, 13);
    d(mockNextFn, 14, 15);
    d(mockNextFn, 16, 17);

    expect(mockNextFn).toHaveBeenCalledTimes(2);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
    expect(mockNextFn).toHaveBeenNthCalledWith(2, [
      [10, 11],
      [12, 13],
      [14, 15],
      [16, 17],
    ]);
  });
  
});
