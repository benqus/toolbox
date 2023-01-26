import { createNextFn } from '../../__mocks__/nextFn';
import { reduce } from './reduce';

describe('transform', () => {
  test('fn', () => {
    const s = reduce(() => ({}));

    expect(s).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const mockNextFn = createNextFn();
    const output = [1, 2, 3];
    const s = reduce(() => output);

    s(mockNextFn);

    expect(mockNextFn).toHaveBeenCalledTimes(1);
    expect(mockNextFn).toHaveBeenCalledWith(output);
  });
});
