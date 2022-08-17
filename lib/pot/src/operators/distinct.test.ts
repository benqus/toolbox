import { createMockExecutionOptions } from '../__mocks__/executionOptions';
import { distinct } from './distinct';

describe('distinct', () => {
  test('fn', () => {
    const s = distinct(() => ({}));

    expect(s).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const optionsMock = createMockExecutionOptions();
    const s = distinct((n, m) => n + m);

    s(optionsMock, 1, 2);
    s(optionsMock, 3, 4);
    s(optionsMock, 3, 4);

    expect(optionsMock.next).toHaveBeenCalledTimes(2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, 1, 2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(2, 3, 4);
  });
});
