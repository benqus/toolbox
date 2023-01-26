import { createNextFn } from '../../__mocks__/nextFn';
import { times } from './times';

describe('times', () => {
  test('fn', () => {
    const fn = times(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('triggers next x times with same arguments', () => {
    const mockNextFn1 = createNextFn();
    const mockNextFn2 = createNextFn();
    const fn = times(3);

    fn(mockNextFn1, 1, 2, 3);
    fn(mockNextFn2, 1, 2, 3);

    expect(mockNextFn1).toHaveBeenCalledTimes(3);
    expect(mockNextFn1).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(mockNextFn1).toHaveBeenNthCalledWith(2, 1, 2, 3);
    expect(mockNextFn1).toHaveBeenNthCalledWith(3, 1, 2, 3);

    expect(mockNextFn2).toHaveBeenCalledTimes(3);
    expect(mockNextFn2).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(mockNextFn2).toHaveBeenNthCalledWith(2, 1, 2, 3);
    expect(mockNextFn2).toHaveBeenNthCalledWith(3, 1, 2, 3);
  });
});
